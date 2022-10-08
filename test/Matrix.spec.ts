var assert = require('assert');
import Matrix from "../src/matrix/Matrix";
import ConstructorDataset from './datasets/MatrixConstructorDataset';
import SetDataset from './datasets/SetMatrixDataset';
import WrongParamDataset from './datasets/WrongParamDataset'

describe('Matrix', () => {
    describe('constructor()', () => {
        it('should construct Matrix object easly', () => {
            let m = new Matrix(2, 2)
        });

        it('should throw error with wrong initiation', () => {
            for(let i = 0 ; i < ConstructorDataset.length; i++) {
                assert.throws(() => {
                    let m = new Matrix(ConstructorDataset[i][0], ConstructorDataset[i][1])
                })
            }
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

        it('should throw bad input exception', () => {
            let m = new Matrix(2, 2)
            for(let i = 0 ; i < SetDataset.length; i++) {
                assert.throws(() => {
                    //@ts-ignore
                    m.set(SetDataset[i])
                })
            }
            assert.deepEqual(
                [
                    [0, 0],
                    [0, 0]
                ],
                m.get()
            )
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

        it('should throw wrong return value error', () => {
            let m = new Matrix(2, 2);
            for(let i = 0 ; i < WrongParamDataset.length; i++) {
                let param = WrongParamDataset[i]
                //@ts-ignore
                assert.throws(() => m.map(() => param))
            }
        })
    })

    describe('check scalar', () => {
        it('should check if scalar is of a good type', () => {
            let m = new Matrix(2, 2);
            for(let i = 0 ; i < WrongParamDataset.length; i++) {
                //@ts-ignore
                assert.throws(() => m.checkScalar(WrongParamDataset[i]))
            }
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

        it('should check scalar type if it is provided', () => {
            let m = new Matrix(2, 2);
            for(let i = 3 ; i < WrongParamDataset.length; i++) {
                assert.throws(() => {
                    //@ts-ignore
                    m.randomize(WrongParamDataset[i])
                })
            }
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
            })
        })
    })
});
