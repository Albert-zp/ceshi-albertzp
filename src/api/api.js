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

// 获取单个景点的详情
export const getAttractionDetails = (id) => {
  return api
    .get(`/attractions/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`获取景点 ${id} 失败`, error);
      throw error;
    });
};

// 创建或更新景点
export const saveOrUpdateAttraction = (attraction) => {
  if (attraction.id) {
    // 更新景点
    return api
      .put(`/attractions/${attraction.id}`, attraction)
      .then((response) => response.data)
      .catch((error) => {
        console.error("更新景点失败", error);
        throw error;
      });
  } else {
    // 创建景点
    return api
      .post("/attractions", attraction)
      .then((response) => response.data)
      .catch((error) => {
        console.error("创建景点失败", error);
        throw error;
      });
  }
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

// 获取所有区域
export const getRegions = () => {
  return api
    .get("/regions")
    .then((response) => response.data)
    .catch((error) => {
      console.error("获取区域列表失败", error);
      throw error;
    });
};

// 获取单个区域的详细信息
export const getRegionDetails = (id) => {
  return api
    .get(`/regions/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`获取区域 ${id} 失败`, error);
      throw error;
    });
};

// 创建区域
export const createRegion = (region) => {
  return api
    .post("/regions", region)
    .then((response) => response.data)
    .catch((error) => {
      console.error("创建区域失败", error);
      throw error;
    });
};

// 更新区域
export const updateRegion = (region) => {
  if (region.id) {
    return api
      .put(`/regions/${region.id}`, region)
      .then((response) => response.data)
      .catch((error) => {
        console.error("更新区域失败", error);
        throw error;
      });
  } else {
    throw new Error("更新时未提供有效的区域ID");
  }
};
// 删除区域
export const deleteRegion = (id) => {
  return api
    .delete(`/regions/${id}`) // 调用删除区域的接口
    .then((response) => response.data)
    .catch((error) => {
      console.error(`删除区域 ${id} 失败`, error);
      throw error; // 错误处理
    });
};
