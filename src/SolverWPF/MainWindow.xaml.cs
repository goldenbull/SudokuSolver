using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using DevExpress.Xpf.Core;

namespace SolverWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : DXWindow
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 初始化所有grid
        /// </summary>
        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _uniGrid.Columns = 3;
            _uniGrid.Rows = 3;
            for (int i = 0; i < 9; i++)
            {
                var border = new Border
                {
                    BorderThickness = new Thickness(1),
                    BorderBrush = Brushes.Blue,
                    Margin = new Thickness(3),
                    HorizontalAlignment = HorizontalAlignment.Stretch,
                    VerticalAlignment = VerticalAlignment.Stretch,
                    Child = new TextBlock {Text = i.ToString()}
                };

                var vbox = new Viewbox {Child = border,Stretch = Stretch.Fill};
                _uniGrid.Children.Add(vbox);
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