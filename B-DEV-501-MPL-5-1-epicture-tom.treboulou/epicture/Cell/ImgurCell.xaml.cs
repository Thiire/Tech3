using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.PlatformConfiguration.iOSSpecific;
using Xamarin.Forms.Xaml;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;

namespace epicture.Cell
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ImgurCell : ViewCell
    {
        public static readonly BindableProperty LinkProperty =
        BindableProperty.Create("link", typeof(string), typeof(ImgurCell), null);
        public static readonly BindableProperty TitleProperty =
        BindableProperty.Create("title", typeof(string), typeof(ImgurCell), null);
        public static readonly BindableProperty AccesProperty =
        BindableProperty.Create("acces", typeof(string), typeof(ImgurCell), null);

        public string Link
        {
            get { return (string)GetValue(LinkProperty); }
            set { SetValue(LinkProperty, value); }
        }

        public string Title
        {
            get { return (string)GetValue(TitleProperty); }
            set { SetValue(TitleProperty, value); }
        }

        public string Acces
        {
            get { return (string)GetValue(AccesProperty); }
            set { SetValue(AccesProperty, value); }
        }

        private bool like = false;
        private string imageHash = null;

        public ImgurCell()
        {
            InitializeComponent();
            mainImage.SetBinding(Image.SourceProperty, "link");
            titleLabel.SetBinding(Label.TextProperty, "title");
            tmpToken.SetBinding(Label.TextProperty, "acces");
        }

        private async void CellClicked(object sender, System.EventArgs e)
        {
            if (like)
            {
                return;
            }
            like = !like;
            imageHash = mainImage.Source.ToString().Substring(25, 7);
            likeImage.Source = "love_full.png";
            HttpClient client = new HttpClient();
            HttpRequestMessage msg = new HttpRequestMessage
            {
                RequestUri = new Uri("https://api.imgur.com/3/image/" + imageHash + "/favorite"),
                Method = HttpMethod.Post,
                Headers =
                {
                    {HttpRequestHeader.Authorization.ToString(), "Bearer " + tmpToken.Text }
                }
            };
            var response = await client.SendAsync(msg);
            Debug.WriteLine(response.StatusCode);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                Debug.WriteLine("liked");
            }
            }

        protected override void OnBindingContextChanged()
        {
            base.OnBindingContextChanged();

            if (BindingContext != null)
            {
                if (Link != null)
                {
                    mainImage.Source = Link;
                }
                if (Title != null)
                {
                    titleLabel.Text = Title;
                }
                if (Acces != null)
                {
                    tmpToken.Text = Acces;
                }
            }
        }
    }
}