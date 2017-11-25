using System;
using System.Collections.Generic;

namespace libSolver
{
    /// <summary>
    /// 9x9 cells
    /// </summary>
    public class Board
    {
        class Pt
        {
            public Pt(int x, int y)
            {
                X = x;
                Y = y;
            }

            internal int X { get; }
            internal int Y { get; }
        }

        public Cell[,] Cells { get; } = new Cell[9, 9];

        /// <summary>
        /// 初始化
        /// </summary>
        public Board()
        {
            for (int i = 0; i < 9; i++)
            {
                for (int j = 0; j < 9; j++)
                    Cells[i, j] = new Cell();
            }
        }

        List<Pt> CellsInBlock(int x, int y)
        {
            if (x < 0 || 9 <= x) throw new ArgumentOutOfRangeException(nameof(x));
            if (y < 0 || 9 <= y) throw new ArgumentOutOfRangeException(nameof(y));

            var cells = new List<Pt>();
            var x0 = x / 3;
            var y0 = y / 3;
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                    cells.Add(new Pt(x0 + i, y0 + j));
            }
            return cells;
        }

        public void SetNumber(int x, int y, int number)
        {
            if (x < 0 || 9 <= x) throw new ArgumentOutOfRangeException(nameof(x));
            if (y < 0 || 9 <= y) throw new ArgumentOutOfRangeException(nameof(y));
            if (number < 1 || 9 < number) throw new ArgumentOutOfRangeException(nameof(number));

            var cell = Cells[x, y];
            if (cell.IsDetermined)
                throw new Exception($"[{x},{y}] already has number {cell.Number}");

            // 当前点
            cell.SetNumber(number);

            // 横竖两行
            for (int i = 0; i < 9; i++)
            {
                if (i != x)
                    Cells[i, y].RemoveCandidate(number);
                if (i != y)
                    Cells[x, i].RemoveCandidate(number);
            }

            // 3x3 block
            foreach (var pt in CellsInBlock(x, y))
            {
                if (pt.X != x && pt.Y != y)
                    Cells[pt.X, pt.Y].RemoveCandidate(number);
            }
        }
    }
}