import test from 'ava';
import { MovingFunctionAggregation } from '../../src';
import {
    illegalCall,
    makeSetsOptionMacro,
    nameTypeExpectStrategy,
    setsAggType
} from '../_macros';

const getInstance = (bucketsPath, window, script) =>
    new MovingFunctionAggregation('my_agg', bucketsPath, window, script);

const setsOption = makeSetsOptionMacro(
    getInstance,
    nameTypeExpectStrategy('my_agg', 'moving_fn')
);

test(setsAggType, MovingFunctionAggregation, 'moving_fn');
test(illegalCall, MovingFunctionAggregation, 'format', 'my_agg');

test(setsOption, 'shift', { param: 1 });

test('constructor set arguments', t => {
    const value = getInstance(
        'my_buckets_path',
        7,
        'MovingFunctions.sum(my_buckets_path)'
    ).toJSON();
    const expected = {
        my_agg: {
            moving_fn: {
                buckets_path: 'my_buckets_path',
                window: 7,
                script: 'MovingFunctions.sum(my_buckets_path)'
            }
        }
    };
    t.deepEqual(value, expected);
});
