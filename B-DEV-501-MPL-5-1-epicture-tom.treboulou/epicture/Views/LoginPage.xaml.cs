using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace epicture.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
            WebView.Source = "https://api.imgur.com/oauth2/authorize?client_id=f60f8473f1c177f&response_type=token";
        }

        private async void Webview_Navigating(object sender, WebNavigatingEventArgs e)
        {
            Debug.WriteLine(e.Url);
            if (e.Url.Contains("callback"))
            {
                Debug.WriteLine("in");
                string[] tmp = e.Url.Split('=');
                await Navigation.PushAsync(new NavBar(tmp[1].Split('&')[0], tmp[2].Split('&')[0], tmp[3].Split('&')[0], tmp[4].Split('&')[0], tmp[5].Split('&')[0], tmp[6].Split('&')[0]));
                Navigation.RemovePage(this);
            }
        }

    }
}