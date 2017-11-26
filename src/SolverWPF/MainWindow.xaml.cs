using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Media;
using DevExpress.Xpf.Core;
using DevExpress.Xpf.Core.Native;
using libSolver;

namespace SolverWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : DXWindow
    {
        readonly Board board = new Board();

        public MainWindow()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 初始化所有grid，9个block，每个block内部9个cell
        /// </summary>
        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _uniGrid.Columns = 3;
            _uniGrid.Rows = 3;
            for (int i = 0; i < 9; i++)
            {
                var block = new UniformGrid {Columns = 3, Rows = 3};
                for (int j = 0; j < 9; j++)
                {
                    var cell = board.Cells[(i % 3) * 3 + j % 3, (i / 3) * 3 + j / 3];
                    var cg = new CellGrid();
                    cg.AssignCell(cell);
                    block.Children.Add(cg);
                }

                var border = new Border
                {
                    BorderThickness = new Thickness(0.5),
                    BorderBrush = Brushes.Blue,
                    Child = block,
                };

                _uniGrid.Children.Add(border);
            }
        }

        private void BtnReset_OnClick(object sender, RoutedEventArgs e)
        {
        }

        private void BtnBack_OnClick(object sender, RoutedEventArgs e)
        {
        }
    }
}