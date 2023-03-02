using epicture.Cell;
using epicture.Class;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace epicture.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ProfilPage : ContentPage
    {
        public string acces { get; set; }
        public string expire { get; set; }
        public string type { get; set; }
        public string token { get; set; }
        public string name { get; set; }
        public string id { get; set; }

        private bool state = false;
        public RootObject images;
        public ProfilPage()
        {
            InitializeComponent();
            listview.ItemTemplate = new DataTemplate(typeof(ImgurCell));
        }

        private async Task<RootObject> GetImages(string tmpUri)
        {
            RootObject images;
            HttpClient client = new HttpClient();
            HttpRequestMessage msg = new HttpRequestMessage
            {
                RequestUri = new Uri(tmpUri),
                Method = HttpMethod.Get,
                Headers =
                {
                    {HttpRequestHeader.Authorization.ToString(), "Bearer " + acces }
                }
            };
            var response = await client.SendAsync(msg);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                string str = await response.Content.ReadAsStringAsync();
                images = JsonConvert.DeserializeObject<RootObject>(str);
                for (var i = images.data.Count - 1; i >= 0; i--)
                {
                    images.data[i].acces = acces;
                    if (images.data[i].is_album)
                    {
                        images.data[i].link = "https://i.imgur.com/" + images.data[i].images[0].id + ".gif";
                        images.data[i].height = 400;
                    }
                }
                return (images);
            }
            return null;
        }

        private async void switchButton_Clicked(object sender, EventArgs e)
        {
            state = !state;
            if (state)
            {
                switchButton.BackgroundColor = Color.OrangeRed;
                switchButton.Text = "Favorites";
                images = await GetImages("https://api.imgur.com/3/account/me/favorites/0/newest");
                listview.ItemsSource = images.data;
            } else
            {
                switchButton.BackgroundColor = Color.LightBlue;
                switchButton.Text = "Photos";
                images = await GetImages("https://api.imgur.com/3/account/me/images");
                listview.ItemsSource = images.data;
            }
        }
    }
}