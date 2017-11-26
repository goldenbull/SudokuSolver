using System;
using System.Collections.Generic;
using System.Linq;

namespace libSolver
{
    /// <summary>
    /// 最基础的单元，一个格子
    /// </summary>
    public class Cell
    {
        public Cell(int x, int y)
        {
            X = x;
            Y = y;
        }

        public int X { get; }
        public int Y { get; }

        public int? Number { get; set; }
        public List<int> Candidates { get; set; } = Enumerable.Range(1, 9).ToList();

        public bool IsDetermined => Number.HasValue;
        public bool IsInvalid => Candidates.Count == 0 && !Number.HasValue;

        public void SetNumber(int number)
        {
            if (number < 1 || 9 < number) throw new ArgumentOutOfRangeException(nameof(number));
            Number = number;
            Candidates.Clear();
        }

        public void RemoveCandidate(int number)
        {
            if (number < 1 || 9 < number) throw new ArgumentOutOfRangeException(nameof(number));
            Candidates.Remove(number);
        }
    }
}