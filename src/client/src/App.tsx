import React, { useRef, useReducer, useEffect } from "react";

import { GraphQLSchema, IntrospectionQuery, buildClientSchema, getIntrospectionQuery, parse } from "graphql";
import GraphiQL from "graphiql";
import GraphiQLExplorer from "graphiql-explorer";

import "graphiql/graphiql.css";

type State = {
  schema: GraphQLSchema | null,
  query: string,
  explorerIsOpen: boolean
};

type SchemaResponse = { data: IntrospectionQuery }

type Action =
  | { type: 'SET_QUERY', payload: string }
  | { type: 'TOGGLE_EXPLORER', payload: boolean }
  | { type: 'SET_SCHEMA', payload: GraphQLSchema }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_QUERY": {
      return {
        ...state,
        query: action.payload
      }
    }

    case "SET_SCHEMA": {
      return {
        ...state,
        schema: action.payload
      }
    }

    case "TOGGLE_EXPLORER": {
      return {
        ...state,
        explorerIsOpen: action.payload
      }
    }

    default: {
      return state
    }
  }
}

const App: React.FC<{}> = () => {
  const graphiql = useRef(null);
  const [state, dispatch] = useReducer(reducer, { schema: null, query: '', explorerIsOpen: true });

  const handleEditQuery = (query: string) => {
    dispatch({ type: 'SET_QUERY', payload: query })
  }

  const handleToggleExplorer = () => {
    dispatch({ type: 'TOGGLE_EXPLORER', payload: !state.explorerIsOpen })
  }

  const handleInspectOperation = (query: string) => (
    cm: any,
    mousePos: { line: Number, ch: Number }
  ) => {
    const parsedQuery = parse(query || "");

    if (!parsedQuery) {
      console.error("Couldn't parse query document");
      return null;
    }

    var token = cm.getTokenAt(mousePos);
    var start = { line: mousePos.line, ch: token.start };
    var end = { line: mousePos.line, ch: token.end };
    var relevantMousePos = {
      start: cm.indexFromPos(start),
      end: cm.indexFromPos(end)
    };

    var position = relevantMousePos;

    var def = parsedQuery.definitions.find(definition => {
      if (!definition.loc) {
        console.log("Missing location information for definition");
        return false;
      }

      const { start, end } = definition.loc;
      return start <= position.start && end >= position.end;
    });

    if (!def) {
      console.error(
        "Unable to find definition corresponding to mouse position"
      );
      return null;
    }

    var operationKind =
      def.kind === "OperationDefinition"
        ? def.operation
        : def.kind === "FragmentDefinition"
          ? "fragment"
          : "unknown";

    var operationName =
      def.kind === "OperationDefinition" && !!def.name
        ? def.name.value
        : def.kind === "FragmentDefinition" && !!def.name
          ? def.name.value
          : "unknown";

    var selector = `.graphiql-explorer-root #${operationKind}-${operationName}`;

    var el = document.querySelector(selector);
    el && el.scrollIntoView();
  }

  useEffect(() => {
    const buildSchema = async () => {
      let result = await fetcher({
        query: getIntrospectionQuery()
      });

      console.log(result)

      if (!graphiql.current) return;

      // @ts-ignore
      const editor = graphiql.current!.getQueryEditor();
      editor.setOption("extraKeys", {
        ...(editor.options.extraKeys || {}),
        "Shift-Alt-LeftClick": handleInspectOperation(state.query)
      });

      dispatch({ type: 'SET_SCHEMA', payload: buildClientSchema(result.data) });
    }

    buildSchema();
  }, [graphiql, dispatch, state.query])



  return <div className="graphiql-container">
    <GraphiQLExplorer
      schema={state.schema}
      query={state.query}
      onEdit={handleEditQuery}
      onRunOperation={(operationName: any) =>
        // @ts-ignore
        graphiql.current!.handleRunQuery(operationName)
      }
      explorerIsOpen={state.explorerIsOpen}
      onToggleExplorer={handleToggleExplorer}
    />
    <GraphiQL
      ref={graphiql}
      fetcher={fetcher}
      schema={state.schema}
      query={state.query}
      onEditQuery={handleEditQuery}
    >
      <GraphiQL.Toolbar>
        <GraphiQL.Button
          // @ts-ignore
          onClick={() => graphiql.current!.handlePrettifyQuery()}
          label="Prettify"
          title="Prettify Query (Shift-Ctrl-P)"
        />
        <GraphiQL.Button
          // @ts-ignore
          onClick={() => graphiql.current!.handleToggleHistory()}
          label="History"
          title="Show History"
        />
        <GraphiQL.Button
          onClick={handleToggleExplorer}
          label="Explorer"
          title="Toggle Explorer"
        />
      </GraphiQL.Toolbar>
    </GraphiQL>
  </div>
}

async function fetcher(params: Object): Promise<SchemaResponse> {
  let response = await fetch(
    "http://localhost:4000/graphql",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }
  );

  let responseBody = await response.json();
  return responseBody
}

export default App;