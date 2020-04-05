const sendQuery = require("./utils/send-query");
const TOGGLE_TODOS = `
mutation($id:ID!,$text:String!,$completed:Boolean!) {
  updateTodo(id: $id,data:{text:$text, completed:$completed}){
			_id
      completed
  }
}
`;

exports.handler = async (event) => {
  const { _id:id, text, completed } = JSON.parse(event.body);
  console.log({id,text,completed})
  const { data, errors } = await sendQuery(TOGGLE_TODOS, {
    id,
    text,
    completed,
  });
  console.log({errors,data})
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify({ errors }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ updatedTodo: data.updateTodo }),
  };
};
