namespace SolverWPF
{
    public class Region
    {
        public virtual Cell[,] Cells { get; } = new Cell[3, 3];
    }
}