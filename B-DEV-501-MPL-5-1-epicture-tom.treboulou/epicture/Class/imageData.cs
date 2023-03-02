using System;
using System.Collections.Generic;
using System.Text;

namespace epicture.Class
{
    public class albumData
    {
        public string id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
    }

    public class imageData
    {
        public string id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public bool animated { get; set; }
        public double width { get; set; }
        public double height { get; set; }
        public int views { get; set; }
        public bool favorite { get; set; }
        public bool is_album { get; set; }
        public List<albumData> images { get; set; }
        public string link { get; set; }
        public int comment_count { get; set; }
        public string acces { get; set; }

    }

    public class RootObject
    {
        public List<imageData> data { get; set; }
    }
}
