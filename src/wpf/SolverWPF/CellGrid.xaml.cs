using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace SolverWPF
{
    /// <summary>
    /// Interaction logic for CellGrid.xaml
    /// </summary>
    public partial class CellGrid : UserControl
    {
        public MainWindow mainWnd;
        private Cell Cell;

        public CellGrid()
        {
            InitializeComponent();
        }

        public void AssignCell(Cell cell, int selected_x, int selected_y)
        {
            this.Cell = cell;

            var candidates = new int?[9];
            foreach (var c in Cell.Candidates)
                candidates[c - 1] = c;

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
                foreach (var c in candidates)
                {
                    grid.Children.Add(new Viewbox
                    {
                        Margin = new Thickness(2),
                        Child =
                            new TextBlock
                            {
                                Text = c.ToString(),
                                TextAlignment = TextAlignment.Center,
                                VerticalAlignment = VerticalAlignment.Center
                            }
                    });
                }

                if (candidates.Count(c => c.HasValue) == 1)
                    grid.Background = Brushes.LightGreen;
                if (cell.IsInvalid)
                    grid.Background = Brushes.Red;
            }

            if (cell.X == selected_x && cell.Y == selected_y)
            {
                border.BorderThickness = new Thickness(1);
            }
            else
            {
                border.BorderThickness = new Thickness(0.2);
            }
        }

        private void MenuItem_OnClick(object sender, RoutedEventArgs e)
        {
            if (!(sender is MenuItem menu))
                return;
            var n = int.Parse(menu.Header.ToString());
            mainWnd.UserSetNumber(Cell, n);
        }
    }
}