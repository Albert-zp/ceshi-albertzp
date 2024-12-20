// src/api.js

import axios from "axios";

const BASE_URL = "http://47.95.30.36:8080/api"; // 根据实际服务端的URL修改

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 请求超时设为 5 秒
  headers: {
    "Content-Type": "application/json",
  },
});

// 获取所有景点
export const getAttractions = () => {
  // 确保函数名是 getAttractions
  return api
    .get("/attractions")
    .then((response) => response.data)
    .catch((error) => {
      console.error("获取景点失败", error);
      throw error;
    });
};

// 根据地区获取景点
export const getAttractionsByRegion = (regionId) => {
  return api
    .get(`/attractions/region/${regionId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`获取地区 ${regionId} 的景点失败`, error);
      throw error;
    });
};

// 创建或更新景点
export const saveOrUpdateAttraction = (attraction) => {
  return api
    .post("/attractions", attraction)
    .then((response) => response.data)
    .catch((error) => {
      console.error("保存或更新景点失败", error);
      throw error;
    });
};

// 删除景点
export const deleteAttraction = (id) => {
  return api
    .delete(`/attractions/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`删除景点 ${id} 失败`, error);
      throw error;
    });
};
// 获取所有用户
export const getUsers = () => {
  return api
    .get("/users")
    .then((response) => response.data)
    .catch((error) => {
      console.error("获取用户失败", error);
      throw error;
    });
};
