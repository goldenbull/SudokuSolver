using System.Windows;
using System.Windows.Controls;
using DevExpress.Mvvm.POCO;
using libSolver;

namespace SolverWPF
{
    /// <summary>
    /// Interaction logic for CellGrid.xaml
    /// </summary>
    public partial class CellGrid : UserControl
    {
        public class Model
        {
            public virtual Cell Cell { get; set; }

            public virtual int?[] Candidates { get; set; }
            public virtual int? Number { get; set; }
            public virtual bool IsDetermined { get; set; }
            public virtual bool IsInvalid { get; set; }

            public void UpdateFromCell()
            {
                IsDetermined = Cell.IsDetermined;
                IsInvalid = Cell.IsInvalid;
                Number = Cell.Number;
                Candidates = new int?[9];
                foreach (var c in Cell.Candidates)
                    Candidates[c - 1] = c;
            }
        }

        private readonly Model model = ViewModelSource<Model>.Create();

        public CellGrid()
        {
            InitializeComponent();
            this.DataContext = model;
        }

        public void AssignCell(Cell cell)
        {
            model.Cell = cell;
            model.UpdateFromCell();

            if (cell.IsDetermined)
            {
                vbox.Visibility = Visibility.Visible;
                grid.Visibility = Visibility.Collapsed;

                tb.Text = cell.Number.ToString();
            }
            else
            {
                vbox.Visibility = Visibility.Collapsed;
                grid.Visibility = Visibility.Visible;

                grid.Children.Clear();
                grid.Columns = 3;
                grid.Rows = 3;
                foreach (var c in model.Candidates)
                {
                    grid.Children.Add(new TextBlock
                    {
                        Text = c.ToString(),
                        TextAlignment = TextAlignment.Center,
                        VerticalAlignment = VerticalAlignment.Center
                    });
                }
            }
        }

        private void MenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            if (!(sender is MenuItem menu))
                return;
            var n = int.Parse(menu.Header.ToString());
            if (model.Cell.Candidates.Contains(n))
            {
                model.Cell.SetNumber(n);
                model.UpdateFromCell();
                AssignCell(model.Cell);
            }
        }
    }
}