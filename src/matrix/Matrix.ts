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

    randomize(): void {
        this.map(() => Math.random())
    }

    map(func: (value?: number) => number): void {
        for(let i = 0 ; i < this.rows ; i++) {
            for(let j = 0; j < this.cols ; j++) {
                this.matrix[i][j] = func(this.matrix[i][j]);
            }
        }
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
            
        } else {
            console.error("Matrices don't match in dimensions for this operation.");
        }
    }

    private multiplyByScalar(scalar: number): void {
        this.map((value: number) => (value * scalar))
    }
}

export default Matrix;