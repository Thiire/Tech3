package com.area.app.model;

import com.area.app.model.ImgurSubData;
import com.area.app.model.DiscordData;
import com.area.app.model.TwitchChannelData;
import com.wrapper.spotify.model_objects.specification.SavedTrack;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class Dao {
    static private Dao instance;
    private HashMap<String, List<ImgurSubData>> imgurFavoriteData = new HashMap<String, List<ImgurSubData>>();
    private HashMap<String, List<ImgurSubData>> imgurImageData = new HashMap<String, List<ImgurSubData>>();
    private HashMap<String, List<ImgurSubData>> imgurStatFavData = new HashMap<String, List<ImgurSubData>>();
    private HashMap<String, List<ImgurSubData>> imgurStatCommentData = new HashMap<String, List<ImgurSubData>>();
    private HashMap<String, List<ImgurSubData>> imgurStatDownsData = new HashMap<String, List<ImgurSubData>>();
    private HashMap<String, List<ImgurSubData>> imgurStatUpsData = new HashMap<String, List<ImgurSubData>>();

    private HashMap<String, List<DiscordData>> DiscordData = new HashMap<String, List<DiscordData>>();

    private HashMap<String, TwitchChannelData> TwitchFollowData = new HashMap<String, TwitchChannelData>();

    private HashMap<String, List<SavedTrack>> SpotifyLikesData = new HashMap<String, List<SavedTrack>>();

    private Dao() {

    }

    static public Dao getInstance() {
        if (Dao.instance == null)
            Dao.instance = new Dao();
        return Dao.instance;
    }

    public TwitchChannelData getTwitchFollowTokenData(String str) {
        if (this.TwitchFollowData != null && this.TwitchFollowData.containsKey(str)) {
            return this.TwitchFollowData.get(str);
        }
        return null;
    }

    public void setTwitchFollowTokenData(String str, TwitchChannelData data) {
        this.TwitchFollowData.put(str, data);
    }

    public Map<String, TwitchChannelData> getTwitchFollowData() {
        return this.TwitchFollowData;
    }

    public void setTwitchFollowData(HashMap<String, TwitchChannelData> data) {
        this.TwitchFollowData = data;
    }
    /* ---------------------------------------- */

    public List<DiscordData> getDiscordTokenData(String str) {
        if (this.DiscordData != null && this.DiscordData.containsKey(str)) {
            return this.DiscordData.get(str);
        }
        return null;
    }

    public void setDiscordTokenData(String str, List<DiscordData> data) {
        this.DiscordData.put(str, data);
    }

    public Map<String, List<DiscordData>> getDiscordData() {
        return this.DiscordData;
    }

    public void setDiscordData(HashMap<String, List<DiscordData>> data) {
        this.DiscordData = data;
    }
    /* ---------------------------------------- */

    public List<ImgurSubData> getImgurStatFavTokenData(String str) {
        if (this.imgurStatFavData != null && this.imgurStatFavData.containsKey(str)) {
            return this.imgurStatFavData.get(str);
        }
        return null;
    }

    public void setImgurStatFavTokenData(String str, List<ImgurSubData> data) {
        this.imgurStatFavData.put(str, data);
    }

    public Map<String, List<ImgurSubData>> getImgurStatFavData() {
        return this.imgurStatFavData;
    }

    public void setImgurStatFavData(HashMap<String, List<ImgurSubData>> data) {
        this.imgurStatFavData = data;
    }
    /* ---------------------------------------- */

    public List<ImgurSubData> getImgurStatCommentTokenData(String str) {
        if (this.imgurStatCommentData != null && this.imgurStatCommentData.containsKey(str)) {
            return this.imgurStatCommentData.get(str);
        }
        return null;
    }

    public void setImgurStatCommentTokenData(String str, List<ImgurSubData> data) {
        this.imgurStatCommentData.put(str, data);
    }

    public Map<String, List<ImgurSubData>> getImgurStatCommentData() {
        return this.imgurStatCommentData;
    }

    public void setImgurStatCommentData(HashMap<String, List<ImgurSubData>> data) {
        this.imgurStatCommentData = data;
    }

    /* ---------------------------------------- */
    public List<ImgurSubData> getImgurStatUpsTokenData(String str) {
        if (this.imgurStatUpsData != null && this.imgurStatUpsData.containsKey(str)) {
            return this.imgurStatUpsData.get(str);
        }
        return null;
    }

    public void setImgurStatUpsTokenData(String str, List<ImgurSubData> data) {
        this.imgurStatUpsData.put(str, data);
    }

    public Map<String, List<ImgurSubData>> getImgurStatUpsData() {
        return this.imgurStatUpsData;
    }

    public void setImgurStatUpsData(HashMap<String, List<ImgurSubData>> data) {
        this.imgurStatUpsData = data;
    }

    /* ---------------------------------------- */
    public List<ImgurSubData> getImgurStatDownsTokenData(String str) {
        if (this.imgurStatDownsData != null && this.imgurStatDownsData.containsKey(str)) {
            return this.imgurStatDownsData.get(str);
        }
        return null;
    }

    public void setImgurStatDownsTokenData(String str, List<ImgurSubData> data) {
        this.imgurStatDownsData.put(str, data);
    }

    public Map<String, List<ImgurSubData>> getImgurStatDownsData() {
        return this.imgurStatDownsData;
    }

    public void setImgurStatDownsData(HashMap<String, List<ImgurSubData>> data) {
        this.imgurStatDownsData = data;
    }
    /* ---------------------------------------- */

    public List<ImgurSubData> getImgurImageTokenData(String str) {
        if (this.imgurImageData != null && this.imgurImageData.containsKey(str)) {
            return this.imgurImageData.get(str);
        }
        return null;
    }

    public void setImgurImageTokenData(String str, List<ImgurSubData> data) {
        this.imgurImageData.put(str, data);
    }

    public Map<String, List<ImgurSubData>> getImgurImageData() {
        return this.imgurImageData;
    }

    public void setImgurImageData(HashMap<String, List<ImgurSubData>> data) {
        this.imgurImageData = data;
    }

    public List<ImgurSubData> getImgurFavoriteTokenData(String str) {
        if (this.imgurFavoriteData != null && this.imgurFavoriteData.containsKey(str)) {
            return this.imgurFavoriteData.get(str);
        }
        return null;
    }

    public void setImgurFavoriteTokenData(String str, List<ImgurSubData> data) {
        this.imgurFavoriteData.put(str, data);
    }

    public Map<String, List<ImgurSubData>> getImgurFavoriteData() {
        return this.imgurFavoriteData;
    }

    public void setImgurFavoriteData(HashMap<String, List<ImgurSubData>> data) {
        this.imgurFavoriteData = data;
    }

    /* ---------------------------------------- */

    public List<SavedTrack> getSpotifyLikesTokenData(String str) {
        if (this.SpotifyLikesData != null && this.SpotifyLikesData.containsKey(str)) {
            return this.SpotifyLikesData.get(str);
        }
        return null;
    }

    public void setSpotifyLikesTokenData(String str, List<SavedTrack> data) {
        this.SpotifyLikesData.put(str, data);
    }

    public Map<String, List<SavedTrack>> getSpotifyLikesData() {
        return this.SpotifyLikesData;
    }

    public void setSpotifyLikesData(HashMap<String, List<SavedTrack>> data) {
        this.SpotifyLikesData = data;
    }

    /* ---------------------------------------- */

}
