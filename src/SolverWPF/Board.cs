using System;
using DevExpress.Mvvm.POCO;

namespace SolverWPF
{
    /// <summary>
    /// 3x3 regions, 9x9 cells
    /// </summary>
    public class Board
    {
        public virtual Region[,] Regions { get; set; }
        public virtual Cell[,] Cells { get; set; } = new Cell[9, 9];

        public Board()
        {
            var region_factory = ViewModelSource.Factory(() => new Region());
            Regions = new Region[3, 3];
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                    Regions[i, j] = region_factory();
            }


            Reset();
        }

        /// <summary>
        /// 初始化
        /// </summary>
        public void Reset()
        {
            // 3x3 region
            for (int x = 0; x < 3; x++)
            {
                for (int y = 0; y < 3; y++)
                    Regions[x, y] = new Region();
            }

            // 9x9 cell
            for (int y = 0; y < 9; y++)
            {
                for (int x = 0; x < 9; x++)
                {
                    var cell = new Cell(x, y);
                    Cells[x, y] = cell;
                    Regions[x / 3, y / 3].Cells[x % 3, y % 3] = cell;
                }
            }
        }

        public void SetNumber(int x, int y, int number)
        {
            if (x < 0 || 9 <= x) throw new ArgumentOutOfRangeException(nameof(x));
            if (y < 0 || 9 <= y) throw new ArgumentOutOfRangeException(nameof(y));
            if (number < 1 || 9 < number) throw new ArgumentOutOfRangeException(nameof(number));

            var cell = Cells[x, y];
            if (cell.IsDetermined)
                throw new Exception($"[{x},{y}] already has number {cell.Number}");

            if (!cell.Candidates.Contains(number))
                throw new ArgumentOutOfRangeException(nameof(number));

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
            foreach (var c in Regions[x / 3, y / 3].Cells)
            {
                if (c.X != x && c.Y != y)
                    c.RemoveCandidate(number);
            }
        }
    }
}