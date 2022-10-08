import { MatrixType } from "../types/matrix";

class Matrix {
    rows: number;
    cols: number;
    matrix: MatrixType

    constructor(rows: number, cols: number) {
        if(!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0) {
            throw new Error("Wrong matrix constructor values")
        }
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];
        this.initMatrix()
    }

    private initMatrix(): void {
        for(let i = 0 ; i < this.rows ; i++) {
            this.matrix.push(new Array);
            for(let j = 0; j < this.cols ; j++) {
                this.matrix[i].push(0);
            }
        }
    }

    public get(): MatrixType {
        return this.matrix;
    }

    public set(matrix: MatrixType) {
        this.checkMatrix(matrix);
        this.matrix = matrix;
    }

    private checkMatrix(matrix: MatrixType) {
        if(!Array.isArray(matrix) || !Array.isArray(matrix[0]) || matrix.length === 0) {
            throw new Error("Provided value does not match needed matrix type.")
        }
        for(let i = 0 ; i < matrix.length ; i++) {
            if(matrix[i].length === 0) {
                throw new Error("Provided value does not match needed matrix type.")
            }
        }
    }

    /* istanbul ignore next */
    public print(): void {
        console.table(this.matrix);
    }

    public map(func: (value?: number) => number): void {
        if(typeof func(2) !== 'number') {
            throw new Error("Mapping function has to return new number value.")
        }
        for(let i = 0 ; i < this.rows ; i++) {
            for(let j = 0; j < this.cols ; j++) {
                this.matrix[i][j] = func(this.matrix[i][j]);
            }
        }
    }

    public randomize(range?: number): void {
        if(range)
            this.checkScalar(range);

        this.map(() => Math.random() * range)
    }

    public add(scalar: number): void {
        this.checkScalar(scalar);
        this.map((value: number) => (value + scalar))
    }

    public subtract(scalar: number): void {
        this.checkScalar(scalar);
        this.map((value: number) => (value - scalar))
    }

    public multiply(value: number | MatrixType): void {
        if(Array.isArray(value)) {
            this.multiplyByMatrix(value)
        } else {
            this.multiplyByScalar(value)
        }
        
    }

    private multiplyByMatrix(matrix: MatrixType): void {
        if(matrix.length == this.cols) {
            let newM: MatrixType = [];
            for(let i = 0 ; i < this.rows; i++) {
                newM.push(new Array())
                for(let j = 0 ; j < matrix[0].length ; j++) {
                    let sum = 0;
                    for(let k = 0 ; k < this.cols ; k++) {
                        sum += this.matrix[i][k] * matrix[k][j];
                    }
                    newM[i].push(sum);
                }
            }
            this.matrix = newM;
        } else {
            throw new Error("Matrices don't match in dimensions for this operation.");
        }
    }

    private multiplyByScalar(scalar: number): void {
        this.checkScalar(scalar);
        this.map((value: number) => (value * scalar))
    }

    private checkScalar(scalar: number) {
        if(typeof scalar !== 'number') {
            throw new Error("Scalar value has to be a type of number.")
        }
    }
}

export default Matrix;