module.exports = {
  client: {
    service: {
      name: 'homework',
      uri: 'https://homework.nextbil.com/graphql',
      localSchemaFile: './.graphql/schema.graphql',
      output: './src/apollo/__generated__',
      includes: ['./src/**/*.tsx'],
    },
  },
}
