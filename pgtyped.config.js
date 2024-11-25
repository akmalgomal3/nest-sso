module.exports = {
  transforms: [
    {
      mode: 'sql',
      include: '**/*.sql',
      emitTemplate: '{{dir}}/{{name}}.queries.ts',
    },
  ],
  db: {
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    user: 'postgres.rviwahseiudskolyjvdv',
    dbName: 'postgres',
    password: 'Akmal.14032002',
    port: 6543,
  },
  srcDir: './',
  failOnError: false,
  camelCaseColumnNames: false,
  queries: ['./src/sql/**/*.sql'],
  outDir: './src/__generated__',
};
