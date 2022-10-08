import { MatrixType } from "../types/matrix";

class Matrix {
    rows: number;
    cols: number;
    matrix: MatrixType

    constructor(rows: number, cols: number) {
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
        this.matrix = matrix;
    }

    /* istanbul ignore next */
    print(): void {
        console.table(this.matrix);
    }

    map(func: (value?: number) => number): void {
        for(let i = 0 ; i < this.rows ; i++) {
            for(let j = 0; j < this.cols ; j++) {
                this.matrix[i][j] = func(this.matrix[i][j]);
            }
        }
    }

    randomize(range?: number): void {
        this.map(() => Math.random() * range)
    }

    add(scalar: number): void {
        this.map((value: number) => (value + scalar))
    }

    subtract(scalar: number): void {
        this.map((value: number) => (value - scalar))
    }

    multiply(value: number | MatrixType): void {
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
        this.map((value: number) => (value * scalar))
    }
}

export default Matrix;