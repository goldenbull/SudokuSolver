using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Input;
using System.Windows.Media;
using DevExpress.Xpf.Core;

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
                    var block = new UniformGrid { Columns = 3, Rows = 3 };
                    var region = board.Regions[rx, ry];
                    for (int y = 0; y < 3; y++)
                    {
                        for (int x = 0; x < 3; x++)
                        {
                            var cell = region.Cells[x, y];
                            var cg = new CellGrid { mainWnd = this };
                            cg.AssignCell(cell, cur_x, cur_y);
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

        private void BtnAuto_OnClick(object sender, RoutedEventArgs e)
        {
            try
            {
                AutoFill();
                UpdateUI();
            }
            catch
            {
            }
        }

        private void AutoFill()
        {
            var cells = board.Cells.Cast<Cell>().Where(c => !c.IsDetermined && c.Candidates.Count == 1).ToArray();
            foreach (var cell in cells)
            {
                var n = cell.Candidates[0];
                board.SetNumber(cell.X, cell.Y, n);
                moves.Add(new Move { x = cell.X, y = cell.Y, number = n });
            }
        }

        public void UserSetNumber(Cell cell, int n)
        {
            try
            {
                board.SetNumber(cell.X, cell.Y, n);
                moves.Add(new Move { x = cell.X, y = cell.Y, number = n });
                UpdateUI();
            }
            catch (Exception)
            {
                MessageBox.Show("错误！");
            }
        }

        /// <summary>
        /// keyboard actions
        /// </summary>
        int cur_x = 0;

        int cur_y = 0;

        private void DXWindow_KeyDown(object sender, KeyEventArgs e)
        {
            try
            {
                if (e.Key >= Key.D1 && e.Key <= Key.D9)
                {
                    var n = e.Key - Key.D0;
                    board.SetNumber(cur_x, cur_y, n);
                    moves.Add(new Move { x = cur_x, y = cur_y, number = n });
                }

                if (e.Key >= Key.NumPad1 && e.Key <= Key.NumPad9)
                {
                    var n = e.Key - Key.NumPad0;
                    board.SetNumber(cur_x, cur_y, n);
                    moves.Add(new Move { x = cur_x, y = cur_y, number = n });
                }

                if (e.Key == Key.Up)
                {
                    cur_y--;
                    if (cur_y < 0) cur_y = 8;
                }

                if (e.Key == Key.Down)
                {
                    cur_y++;
                    if (cur_y > 8) cur_y = 0;
                }

                if (e.Key == Key.Left)
                {
                    cur_x--;
                    if (cur_x < 0) cur_x = 8;
                }

                if (e.Key == Key.Right)
                {
                    cur_x++;
                    if (cur_x > 8) cur_x = 0;
                }

                if (e.Key == Key.A)
                    AutoFill();

                UpdateUI();
            }
            catch
            {
            }
        }
    }
}