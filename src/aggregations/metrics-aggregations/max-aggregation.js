'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

/**
 * A single-value metrics aggregation that keeps track and returns the
 * maximum value among the numeric values extracted from the aggregated
 * documents. These values can be extracted either from specific numeric fields
 * in the documents, or be generated by a provided script.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html)
 *
 * Aggregation that keeps track and returns the maximum value among the
 * numeric values extracted from the aggregated documents.
 *
 * @example
 * const agg = esb.maxAggregation('max_price', 'price');
 *
 * @example
 * // Use a file script
 * const agg = esb.maxAggregation('max_price').script(
 *     esb.script('file', 'my_script').params({ field: 'price' })
 * );
 *
 * @example
 * // Value script to apply the conversion rate to every value
 * // before it is aggregated
 * const agg = esb.maxAggregation('max_price').script(
 *     esb.script('inline', '_value * params.conversion_rate').params({
 *         conversion_rate: 1.2
 *     })
 * );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends MetricsAggregationBase
 */
class MaxAggregation extends MetricsAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, field) {
        super(name, 'max', field);
    }
}

module.exports = MaxAggregation;
