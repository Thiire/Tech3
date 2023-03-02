using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace epicture.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NavBar : TabbedPage
    {
        public string acces;
        public string expire;
        public string type;
        public string token { get; set; }
        public string name { get; set; }
        public string id;
        public NavBar(string tmpAcces, string tmpExpire, string tmpType, string tmpToken, string tmpName, string tmpId)
        {
            InitializeComponent();
            firstpage.acces = tmpAcces;
            firstpage.expire = tmpExpire;
            firstpage.token = tmpToken;
            firstpage.type = tmpType;
            firstpage.name = tmpName;
            firstpage.id = tmpId;

            profilpage.acces = tmpAcces;
            profilpage.expire = tmpExpire;
            profilpage.token = tmpToken;
            profilpage.type = tmpType;
            profilpage.name = tmpName;
            profilpage.id = tmpId;

            acces = tmpAcces;
            expire = tmpExpire;
            type = tmpType;
            token = tmpToken;
            name = tmpName;
            id = tmpId;
        }
    }
}