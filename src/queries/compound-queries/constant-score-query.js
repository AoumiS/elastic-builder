'use strict';

const isNil = require('lodash.isnil');

const {
    Query,
    util: { checkType }
} = require('../../core');

/**
 * A query that wraps another query and simply returns a constant score
 * equal to the query boost for every document in the filter.
 * Maps to Lucene `ConstantScoreQuery`.
 *
 * Constructs a query where each documents returned by the internal
 * query or filter have a constant score equal to the boost factor.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html)
 *
 * @extends Query
 */
class ConstantScoreQuery extends Query {

    /**
     * Creates an instance of `ConstantScoreQuery`
     *
     * @param {Query=} filterQuery Query to filter on.
     */
    constructor(filterQuery) {
        super('constant_score');

        if (!isNil(filterQuery)) this.filter(filterQuery);
    }

    /**
     * Adds the query to apply a constant score to.
     *
     * @param {Query} filterQuery  Query to filter on.
     * @returns {ConstantScoreQuery} returns `this` so that calls can be chained.
     */
    filter(filterQuery) {
        checkType(filterQuery, Query);

        this._queryOpts.filter = filterQuery;
        return this;
    }

    /**
     * Adds the query to apply a constant score to.
     * Alias for method `filter`.
     *
     * @param {Query} filterQuery  Query to filter on.
     * @returns {ConstantScoreQuery} returns `this` so that calls can be chained.
     */
    query(filterQuery) {
        return this.filter(filterQuery);
    }
}

module.exports = ConstantScoreQuery;
