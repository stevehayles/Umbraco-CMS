﻿using System;
using NPoco;
using Umbraco.Core.Migrations.Expressions.Common;
using Umbraco.Core.Migrations.Expressions.Execute.Expressions;
using Umbraco.Core.Persistence.DatabaseModelDefinitions;

namespace Umbraco.Core.Migrations.Expressions.Create.KeysAndIndexes
{
    public class CreateKeysAndIndexesBuilder : IExecutableBuilder
    {
        private readonly IMigrationContext _context;
        private readonly DatabaseType[] _supportedDatabaseTypes;

        public CreateKeysAndIndexesBuilder(IMigrationContext context, params DatabaseType[] supportedDatabaseTypes)
        {
            _context = context;
            _supportedDatabaseTypes = supportedDatabaseTypes;
        }

        public Type TypeOfDto { get; set; }

        /// <inheritdoc />
        public void Do()
        {
            var syntax = _context.SqlContext.SqlSyntax;
            var tableDefinition = DefinitionFactory.GetTableDefinition(TypeOfDto, syntax);

            ExecuteSql(syntax.FormatPrimaryKey(tableDefinition));
            foreach (var sql in syntax.Format(tableDefinition.Indexes))
                ExecuteSql(sql);
            foreach (var sql in syntax.Format(tableDefinition.ForeignKeys))
                ExecuteSql(sql);
        }

        private void ExecuteSql(string sql)
        {
            new ExecuteSqlStatementExpression(_context) { SqlStatement = sql }
                .Execute();
        }
    }
}
