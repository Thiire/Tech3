package com.area.app.model;

import java.util.List;

public class MultipleResponseModel {
    private List<Data> _data;
    private Boolean _success;
    private int _status;

    public MultipleResponseModel() {

    }

    public MultipleResponseModel(List<Data> data, Boolean success, int status) {
        this._data = data;
        this._status = status;
        this._success = success;
    }

    public List<Data> getData() {
        return this._data;
    }

    public int getStatus() {
        return this._status;
    }

    public Boolean getSuccess() {
        return this._success;
    }

    public void setData(List<Data> data) {
        this._data = data;
    }

    public void setStatus(int status) {
        this._status = status;
    }

    public void setSuccess(Boolean success) {
        this._success = success;
    }

    @Override
    public String toString() {
        return "{" + 
            "data=" + this._data + 
            ",success=" + this._success +
            ",status=" + this._status +
        "}";
    }
}
