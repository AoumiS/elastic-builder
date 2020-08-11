'use strict';

const isNil = require('lodash.isnil');

const PipelineAggregationBase = require('./pipeline-aggregation-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movfn-aggregation.html';

/**
 * Given an ordered series of data, the Moving Function aggregation will
 * slide a window across the data and allow the user to specify a custom
 * script that is executed on each window of data
 *
 * `moving_fn` aggregations must be embedded inside of a histogram or
 * date_histogram aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movfn-aggregation.html)
 *
 * @example
 * const agg = esb.movingFunctionAggregation('the_movfn', 'the_sum')
 *     .window(5)
 *     .script("MovingFunctions.min(values)");
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('my_date_histo', 'timestamp')
 *             .interval('day')
 *             .agg(esb.sumAggregation('the_sum', 'lemmings'))
 *             // Relative path to sibling metric `the_sum`
 *             .agg(
 *                  esb.movingFunctionAggregation('the_movfn', 'the_sum')
 *                      .window(5)
 *                      .script("MovingFunctions.min(values)")
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string} bucketsPath The relative path of metric to aggregate over
 * @param {number} window Sets the size of window to "slide" across the histogram
 * @param {script} script Sets script parameter for aggregation
 *
 * @extends PipelineAggregationBase
 */
class MovingFunctionAggregation extends PipelineAggregationBase {
    // eslint-disable-next-line require-jsdoc
    constructor(name, bucketsPath, window, script) {
        super(name, 'moving_fn', ES_REF_URL, bucketsPath);
        if (!isNil(window)) this._aggsDef.window = window;
        if (!isNil(script)) this._aggsDef.script = script;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on MovingFunctionAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in MovingFunctionAggregation');
    }

    /**
     * Shift of window position.
     * Optional.
     *
     * @example
     * const agg = esb.movingFunctionAggregation('the_movfn', 'the_sum')
     *     .model('simple')
     *     .window(30)
     *     .shift(10);
     *
     * @param {number} shift of window position
     * @returns {MovingFunctionAggregation} returns `this` so that calls can be chained
     */
    shift(shift) {
        this._aggsDef.shift = shift;
        return this;
    }
}

module.exports = MovingFunctionAggregation;
