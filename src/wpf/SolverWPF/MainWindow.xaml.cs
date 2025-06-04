using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Media;
using DevExpress.Xpf.Core;
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
            UpdateUI();
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
        }

        public void UpdateUI()
        {
            _uniGrid.Children.Clear();

            for (int ry = 0; ry < 3; ry++)
            {
                for (int rx = 0; rx < 3; rx++)
                {
                    var block = new UniformGrid {Columns = 3, Rows = 3};
                    var region = board.Regions[rx, ry];
                    for (int y = 0; y < 3; y++)
                    {
                        for (int x = 0; x < 3; x++)
                        {
                            var cell = region.Cells[x, y];
                            var cg = new CellGrid {mainWnd = this};
                            cg.AssignCell(cell);
                            block.Children.Add(cg);
                        }
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
        }

        private void BtnReset_OnClick(object sender, RoutedEventArgs e)
        {
            if (MessageBox.Show("当前进度会全部丢失！确认重新开始？", "警告", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                moves.Clear();
                board.Reset();
                UpdateUI();
            }
        }

        public class Move
        {
            public int x;
            public int y;
            public int number;
        }

        readonly List<Move> moves = new List<Move>();

        private void BtnBack_OnClick(object sender, RoutedEventArgs e)
        {
            if (moves.Count == 0) return;
            moves.RemoveAt(moves.Count - 1);
            board.Reset();
            foreach (var move in moves)
                board.SetNumber(move.x, move.y, move.number);
            UpdateUI();
        }

        public void UserSetNumber(Cell cell, int n)
        {
            try
            {
                board.SetNumber(cell.X, cell.Y, n);
                moves.Add(new Move {x = cell.X, y = cell.Y, number = n});
                UpdateUI();
            }
            catch (Exception)
            {
                MessageBox.Show("错误！");
            }
        }
    }
}