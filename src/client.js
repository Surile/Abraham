import http from "@/utils/http";

// 查询垃圾分类
export const findAllType = () => http.get("/type");

// 查询垃圾详情
export const fetchDetail = id => http.get(`/type/${id}`);

// 搜索
export const serachDetail = params => http.post("/goods/search", params);

// 获取百度Token

export const getBaiDuToken = () => http.get("/image");
