﻿using NPoco;

namespace Umbraco.Core.Migrations.Expressions.Delete.Expressions
{
    public class DeleteDefaultConstraintExpression : MigrationExpressionBase
    {
        public DeleteDefaultConstraintExpression(IMigrationContext context)
            : base(context)
        { }

        public virtual string TableName { get; set; }
        public virtual string ColumnName { get; set; }

        protected override string GetSql()
        {
            return string.Format(SqlSyntax.DeleteDefaultConstraint,
                SqlSyntax.GetQuotedTableName(TableName),
                SqlSyntax.GetQuotedColumnName(ColumnName));
        }
    }
}
