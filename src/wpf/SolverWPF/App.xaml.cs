﻿using DevExpress.Xpf.Core;
using System.Windows;

namespace SolverWPF
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private void Application_Startup(object sender, StartupEventArgs e)
        {
            ApplicationThemeHelper.ApplicationThemeName = Theme.Office2019WhiteName;
        }
    }
}
