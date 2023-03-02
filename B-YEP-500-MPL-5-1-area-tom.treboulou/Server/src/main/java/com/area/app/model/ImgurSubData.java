package com.area.app.model;

import java.util.List;

public class ImgurSubData {
    private String link;
    private String id;
    private String title;
    private int ups;
    private int downs;
    private int comment_count;
    private int favorite_count;

    public ImgurSubData() {

    }

    public ImgurSubData(String link) {
        this.link = link;
    }

    public String getLink() {
        return this.link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getUps() {
        return this.ups;
    }

    public int getDowns() {
        return this.downs;
    }

    public int getCommentCount() {
        return this.comment_count;
    }

    public int getFavoriteCount() {
        return this.favorite_count;
    }

    public void setUps(int ups) {
        this.ups = ups;
    }

    public void setDowns(int downs) {
        this.downs = downs;
    }

    public void setCommentCount(int comment_count) {
        this.comment_count = comment_count;
    }

    public void setFavoriteCount(int favorite_count) {
        this.favorite_count = favorite_count;
    }
}
