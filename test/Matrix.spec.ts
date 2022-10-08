var assert = require('assert');
import Matrix from "../src/matrix/Matrix";

describe('Matrix', () => {
    describe('constructor()', () => {
        it('should construct Matrix object easly', () => {
            let m = new Matrix(2, 2)
        });
    });

    describe('get()', () => {
        it('should return specified size matrix filled with zeros', () => {
            let m = new Matrix(2, 2);
            assert.equal(m.get().length, 2)
            assert.equal(m.get()[0].length, 2)
        })
    })

    describe('set()', () => {
        it('should set new given matrix', () => {
            let m = new Matrix(2, 2);
            let oldMatrix = m.get();
            let newMatrix = [[1,2],[3,4]];
            m.set(newMatrix);

            assert.notEqual(oldMatrix, m.get());
            assert.equal(newMatrix, m.get());
        })
    })

    describe('map()', () => {
        it('should apply given function to every number in matrix', () => {
            let m = new Matrix(2, 2);
            m.map((val: number): number => {
                return 2;
            })

            assert.deepEqual(
                [
                    [2, 2],
                    [2, 2]
                ],
                m.get()
            )
        })
    })

    describe('randomize()', () => {
        it('should randomize values inside matrix between 0 and 1', () => {
            let m = new Matrix(2, 2);
            m.randomize();
            let testFailed = false;
            m.map((val: number) => {
                assert.notEqual(0, val);
                return 0;
            });
        })
    })

    describe('add()', () => {
        it('should add a scalar value to every matrix item', () => {
            let m = new Matrix(2, 2);
            m.add(5);
            assert.deepEqual(
                [
                    [5, 5],
                    [5, 5]
                ],
                m.get()
            )
        })
    })

    describe('subtract()', () => {
        it('should subtract a scalar value to every matrix item', () => {
            let m = new Matrix(2, 2);
            m.subtract(5);
            assert.deepEqual(
                [
                    [-5, -5],
                    [-5, -5]
                ],
                m.get()
            )
        })
    })

    describe('multiply()', ()=> {
        describe('multiply by scalar', () => {
            it('should multiply values in matrix by given value', () => {
                let m = new Matrix(2, 2);
                m.add(2)
                m.multiply(5)

                assert.deepEqual(
                    [
                        [10, 10],
                        [10, 10]
                    ],
                    m.get()
                )
            })
        })

        describe('multiply by matrix', () => {
            it('should perform matrix multiplication for square matrices', () => {
                let m = new Matrix(2, 2);
                m.add(2);
                m.multiply([
                    [2, 0],
                    [0, 0.5]
                ])

                assert.deepEqual(
                    [
                        [4, 1],
                        [4, 1]
                    ],
                    m.get()
                )
            })

            it('should perform matrix multiplication for not square matrices', () => {
                let m = new Matrix(2, 3);
                m.add(2);
                m.multiply([
                    [2, 0],
                    [0, 0.5],
                    [1, 0]
                ])

                assert.deepEqual(
                    [
                        [6, 1],
                        [6, 1]
                    ],
                    m.get()
                )
            })

            it('should throw error if matrix multiplication is not allowed', () => {
                let m = new Matrix(2, 4);
                m.add(2);
                assert.throws(() => {
                    m.multiply([
                        [2, 0],
                        [0, 0.5],
                        [1, 0]
                    ])
                })
            }, Error)
        })
    })
});
