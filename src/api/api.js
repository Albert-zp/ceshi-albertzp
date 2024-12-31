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

// 获取指定级别的区域
export const getRegionsByLevel = (level) => {
  return api
    .get(`/regions/level`, { params: { level } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("获取城市数据失败", error);
      throw error;
    });
};

// 获取指定父级区域的子区域
export const getRegionsByParentId = (parentId) => {
  return api
    .get(`/regions/parent/${parentId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`获取父级区域 ${parentId} 的子区域失败`, error);
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
    .delete(`/regions/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`删除区域 ${id} 失败`, error);
      throw error;
    });
};

// 获取所有热门城市
export const getAllHotCities = () => {
  return api
    .get("/hot-cities/")
    .then((response) => response.data)
    .catch((error) => {
      console.error("获取所有热门城市失败", error);
      throw error;
    });
};

// 获取指定区域的热门城市列表（分页）
export const getHotCitiesByRegion = (regionId, page = 0, size = 10) => {
  return api
    .get(`/hot-cities/region/${regionId}`, {
      params: { page, size },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(`获取区域 ${regionId} 的热门城市失败`, error);
      throw error;
    });
};

// 获取指定排名的热门城市（分页）
export const getHotCitiesByRank = (hotRank, page = 0, size = 10) => {
  return api
    .get(`/hot-cities/rank/${hotRank}`, {
      params: { page, size },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(`获取热度排名为 ${hotRank} 的热门城市失败`, error);
      throw error;
    });
};

// 添加热门城市
export function addHotCity(data) {
  return api
    .post("/hot-cities/", data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("添加热门城市失败", error);
      throw error;
    });
}

// 更新热门城市
export const updateHotCity = (hotCity) => {
  if (hotCity.id) {
    return api
      .put(`/hot-cities/${hotCity.id}`, hotCity)
      .then((response) => response.data)
      .catch((error) => {
        console.error("更新热门城市失败", error);
        throw error;
      });
  } else {
    throw new Error("更新时未提供有效的热门城市ID");
  }
};

// 删除热门城市
export const deleteHotCity = (id) => {
  return api
    .delete(`/hot-cities/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`删除热门城市 ${id} 失败`, error);
      throw error;
    });
};

// 根据区域ID删除所有热门城市
export const deleteHotCitiesByRegionId = (regionId) => {
  return api
    .delete(`/hot-cities/region/${regionId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`删除区域 ${regionId} 的所有热门城市失败`, error);
      throw error;
    });
};

// 图片相关接口

// 获取某个景点的所有图片（分页）
export const getImagesByAttractionId = (attractionId, page = 0, size = 10) => {
  return api
    .get(`/images/attraction/${attractionId}`, {
      params: { page, size },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(`获取景点 ${attractionId} 的图片失败`, error);
      throw error;
    });
};

// 获取某个区域的所有图片（分页）
export const getImagesByRegionId = (regionId, page = 0, size = 10) => {
  return api
    .get(`/images/region/${regionId}`, {
      params: { page, size },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(`获取区域 ${regionId} 的图片失败`, error);
      throw error;
    });
};

// 上传图片
export const uploadImage = (file, attractionId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("attractionId", attractionId);

  return api
    .post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("上传图片失败", error);
      throw error;
    });
};

// 删除图片
export const deleteImage = (imageId) => {
  return api
    .delete(`/images/${imageId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`删除图片 ${imageId} 失败`, error);
      throw error;
    });
};
