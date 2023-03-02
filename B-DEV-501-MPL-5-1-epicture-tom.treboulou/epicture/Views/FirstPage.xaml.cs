using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Net.Http;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Net;
using Newtonsoft.Json;
using epicture.Class;
using epicture.Cell;

namespace epicture.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class FirstPage : ContentPage
    {
        public string acces { get; set; }
        public string expire { get; set; }
        public string type { get; set; }
        public string token { get; set; }
        public string name { get; set; }
        public string id { get; set; }
        public RootObject images;

        public FirstPage()
        {
            InitializeComponent();
            listview.ItemTemplate = new DataTemplate(typeof(ImgurCell));
            sortPicker.Items.Add("time");
            sortPicker.Items.Add("viral");
            sortPicker.Items.Add("top");
            timePicker.Items.Add("day");
            timePicker.Items.Add("week");
            timePicker.Items.Add("mounth");
            timePicker.Items.Add("year");
            timePicker.Items.Add("all");
            sortPicker.SelectedIndex = 0;
            timePicker.SelectedIndex = 0;
        }

        private async Task<RootObject> GetImages()
        {
            RootObject images;
            HttpClient client = new HttpClient();
            HttpRequestMessage msg = new HttpRequestMessage
            {
                RequestUri = new Uri("https://api.imgur.com/3/gallery/search/" + sortPicker.Items[sortPicker.SelectedIndex] +"/" + timePicker.Items[timePicker.SelectedIndex] + "/0?q=" + searchLine.Text),
                Method = HttpMethod.Get,
                Headers =
                {
                    {HttpRequestHeader.Authorization.ToString(), "Client-ID f60f8473f1c177f" }
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

        private async void SearchImage(object sender, EventArgs e)
        {
            images = await GetImages();
            listview.ItemsSource = images.data;
        }

    }
}