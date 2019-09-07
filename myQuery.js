const {graphql, 
	GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
  } = require('graphql')

  
function setQuery() {  

const mySchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name : 'MyOwnQuery',
		fields : {
				myname : {
					type : GraphQLString,
					resolve : () => 'baba ali'
				}		
		}
	})
})


let myquery = '{ myname }'

graphql(mySchema,myquery).then(res => console.log(res))

}

module.exports = setQuery
