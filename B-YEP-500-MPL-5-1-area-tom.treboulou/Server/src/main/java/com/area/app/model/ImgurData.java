package com.area.app.model;
import com.area.app.model.ImgurSubData;
import java.util.List;

public class ImgurData {
    private int status;
    private boolean success;
    private List<ImgurSubData> data;
    public ImgurData() {

    }
    public ImgurData(List<ImgurSubData> data) {
        this.data = data;
    }

    public List<ImgurSubData> getData() {
        return this.data;
    }
    public int getStatus() {
        return this.status;
    }
    public boolean getSuccess() {
        return this.success;
    }

    public void setData(List<ImgurSubData> data) {
        this.data = data;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
