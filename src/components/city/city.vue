<template>
  <div>
    <!-- 收货地址三级联动选项 start-->
    <section class="address" :class="{toggHeight:istoggHeight}">
      <section class="city_title">
        <div class="area_box">
          <div class="area" @click="provinceSelected()" :class="[oneac ? 'accolor' : '']">
            {{ Province ? Province : '请选择' }}
          </div>
        </div>
        <div class="area" v-if=" version!=61" @click="citySelected()" :class="[twoac ? 'accolor':'']" v-show="twoshow">
          {{ City ? City : '请选择' }}
        </div>
        <div class="area" v-if=" version!=61" @click="districtSelected()" :class="threeac ? 'accolor':''"
             v-show="threeshow">{{ District ? District : '请选择' }}
        </div>
        <div class="determine" @click="confirm()">确定</div>
      </section>
      <ul v-if="showProvince" class="proJuli">
        <li class="addList" v-for="(v,k) in provinceList" @click="getProvinceId(v.code, v.name, k)" :key="k"
            :class="{active : v.selected}"><span>{{ v.name }}</span></li>
      </ul>
      <ul v-if="showCity && version!=61 " class="citJuli">
        <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.code, v.name, k)" :key="k"
            :class="{active : v.selected}"><span>{{ v.name }}</span></li>
      </ul>
      <ul v-if="showDistrict && version!=61 " class="disJuli">
        <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.code, v.name, k)" :key="v.id"
            :class="{active : v.selected}"><span>{{ v.name }}</span></li>
      </ul>
    </section>
    <!-- 收货地址三级联动选项 end-->
    <div class="layout" :class="{layoutBg:islayout}" @click="closeAdd()"></div>
  </div>
</template>
<script>
import {provinceQuery, cityQuery, queryMerchant, areaQuery} from "@/api/city/city";

export default {
  props: {
    extraList: {},
    card: {}
  },
  data() {
    return {
      islayout: false,
      istoggHeight: false,
      headerTxt: '添加新地址',
      isBc: false, // 用于控制保存按钮高亮
      toggle: false, // 用于切换默认地址
      showDeter: false,
      oneac: true,
      twoac: false,
      threeac: false,
      twoshow: false,
      threeshow: false,
      userAddress: '',
      oneliIndex: '', // 用于高亮子菜单
      twoliIndex: '',
      titleIndex: Number,
      showProvince: true, // 第一个li默认显示
      showCity: false, // 第二个li默认隐藏
      showDistrict: false, // 第三个li默认隐藏
      showCityList: [],
      showDistrictList: [],
      province: '',
      city: '',
      City: '',
      district: '',
      District: '',
      GetProvinceId: 2,
      channelTag: '',
      Province: '',
      // v-for循环判断是否为当前
      selected: true,
      provinceList: [],//省份
      extra: {},//如果选了省市
      version: "",
      merchantList: [],//商户
    }
  },
  created() {
    this.version = this.extraList.version.split('-')[0]
    this.channelTag = this.extraList.channelTag
  },
  methods: {
    getprovince() {
      provinceQuery(this.version, this.card, String(this.extraList.version), this.channelTag).then(res => {
        if (res.resp_code == "000000") {
          this.provinceList = res.result;
          this.provincetion(this.version, res.result, this.channelTag)
        } else if (res.resp_code == "333333") {
          this.closeAdd()
          this.$parent.merchantTrueFalseBy = true
        }
      })
    },
    // 省份处理数据
    provincetion(version, item, channelTag) {
      this.provinceList = []
      var obj = {}
      obj[2] = () => {
        this.provinceList = item
      };
      obj[4] = () => {
        item.map(items => {
          items.name = items.area
          items.code = items.areaCode
        })
        this.provinceList = item
      }
      obj[5] = () => {
        item.map((items, i) => {
          let obj = {}
          obj.name = items
          obj.code = items
          this.provinceList.push(obj)
        })
      }
      obj[8] = obj[4]
      obj[20] = obj[2]
      obj[21] = obj[2]
      obj[25] = () => {
        item.map(items => {
          items.name = items.regionName
          items.code = items.regionId
        })
        this.provinceList = item
      }
      obj[26] = obj[25]
      obj[30] = obj[2]
      obj[32] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.province
        })
        this.provinceList = item
      }
      obj[37] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.id
        })
        this.provinceList = item
      }
      obj[39] = obj[2]
      obj[41] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.provinceCoe
        })
        this.provinceList = item
      }
      obj[42] = obj[2]
      obj[43] = () => {
        item.map(items => {
          items.name = items.provinceName
          items.code = items.provinceCode
        })
        this.provinceList = item
      }
      obj[44] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.id
        })
        this.provinceList = item
      }
      obj[45] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.id
        })
        this.provinceList = item
      }
      obj[46] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.provinceCode
        })
        this.provinceList = item
      }
      obj[47] = () => {
        item.map(items => {
          items.name = items.termValue
          items.code = items.termKey
        })
        this.provinceList = item
      }
      obj[50] = () => {
        item.map(items => {
          items.name = items.areaName
          items.code = items.id
        })
        this.provinceList = item
      }
      obj[52] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.id
        })
        this.provinceList = item
      }
      obj[53] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.code
        })
        this.provinceList = item
      }
      obj[54] = () => {
        item.map(items => {
          items.name = items.areaName
          items.code = items.areaCode
        })
        this.provinceList = item
      }
      obj[55] = () => {
        item.map(items => {
          items.name = items.areaName
          items.code = items.areaCode
        })
        this.provinceList = item
      }
      obj[56] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.provinceId
        })
        this.provinceList = item
      }
      obj[58] = obj[2]
      obj[59] = obj[2]
      obj[61] = () => {
        item.map(items => {
          items.name = items.provinceName
          items.code = items.id
        })
        this.provinceList = item
      }

      obj[62] = obj[47]
      obj[65] = () => {
        item.map(items => {
          items.name = items.areaName
          items.code = items.areaCode
        })
        this.provinceList = item
      }
      obj[66] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.province
        })
        this.provinceList = item
      }
      obj[69] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.id
        })
        this.provinceList = item
      }
      obj[70] = () => {
        item.map(items => {
          items.name = items.city
          items.code = items.code
        })
        this.provinceList = item
      }
      obj[71] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.id
        })
        this.provinceList = item
      }
      obj[72] = () => {
        item.map(items => {
          items.name = items.name
          items.code = items.code
        })
        this.provinceList = item
      }
      obj[73] = obj[71]
      obj[74] = obj[71]
      obj[75] = obj[43]
      obj[76] = obj[71]
      obj[77] = obj[65]
      obj[78] = obj[65]
      obj[79] = () => {
        item.map(items => {
          items.name = items.province
          items.code = items.proCode
        })
        this.provinceList = item
      }
      obj[80] = obj[71]
      obj[81] = obj[71]
      obj[82] = obj[71]
      obj[83] = () => {
        item.map(items => {
          items.name = items.provinceName;
          items.code = items.cityName;
        });
        this.provinceList = item;
      };
      obj[84] = () => {
        item.map(items => {
          items.name = items.province;
          items.code = items.areaId;
        });
        this.provinceList = item;
      };
      obj[85] = () => {
        item.map(items => {
          items.name = items.name;
          items.code = items.preCode;
        });
        this.provinceList = item;
      };
      obj[86] = obj[45];
      obj[87] = () => {
        item.map(items => {
          items.name = items.divisionName;
          items.code = items.id;
        });
        this.provinceList = item;
      };
      obj[88] = () => {
        item.map(items => {
          items.name = items.name;
          items.code = items.provinceCode;
        });
        this.provinceList = item;
      };
      obj[89] = obj[71]
      obj[91] = obj[71]
      obj[92] = obj[71]
      obj[93] = obj[71]
      obj[94] = () => {
        item.map(items => {
          items.name = items.province;
          items.code = items.cityCode;
        });
        this.provinceList = item;
      };
      obj[95] = obj[87]
      obj[96] = obj[88]
      obj[97] = obj[65]
      obj[98] = obj[87]
      obj[99] = obj[87]
      obj[100] = obj[96]
      obj[101] = obj[71]
      obj[102] = obj[94]
      obj[110] = () => {
        item.map(items => {
          items.name = items.cityName;
          items.code = items.cityCode;
        });
        this.provinceList = item;
      };

      obj[111] = () => {
        item.map(items => {
          items.name = items.cityName;
          items.code = items.cityCode;
        });
        this.provinceList = item;
      };

      obj[51] = obj[110]
      obj[140] = obj[110]

      obj[120] = () => {
        item.map(items => {
          items.name = items.cityName
          items.code = items.cityCode
        })
        this.provinceList = item
      }
      return obj[version]()
    },
    choseAdd() { // 选择地址弹层，打开弹层
      this.getprovince()
      this.islayout = true
      this.istoggHeight = true
    },
    closeAdd() { // 关闭弹层
      this.istoggHeight = false
      this.islayout = false
    },
    _newArr(arr, selectid) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].code == selectid) {
          this.$set(arr[i], 'selected', true)
        } else if (selectid == -1) {
          this.$set(arr[i], 'selected', false)
        }
      }
      return arr
    },
    _filter(add, name, code) { // 数组，对应数组内容，对应数组id
      let result = []
      for (let i = 0; i < add.length; i++) {
        if (code == add[i].code) {
          result = add[i][name]
        }
      }
      return result
    },
    _gotoTop(info, index) { // 滚动距离 --> 对应class,第几个index
      let proJuliBox = document.querySelector(info)
      let activeBox = document.getElementsByClassName('active')[index]
      let t = activeBox.offsetTop - 67 + 20 // 后面的数据，根据页面情况自己调整
      proJuliBox.scrollTo(0, t)
    },
    getProvinceId(code, input, index, iscity) { // 点击第一个li
      this.titleIndex = Number
      this.province = code
      this.Province = input // 获取选中的省份
      this.showProvince = false
      if (this.version == 61) {
        this.showProvince = true
      }
      this.showCity = true
      this.showDistrict = false
      if (this.version != 61) {
        this.citytion(this.version, code, input, iscity, this.card, String(this.extraList.version), this.channelTag)
        this.oneac = false // 给第一个nav去掉高亮
        this.twoac = true // 给第二个nav添加高亮
        this.threeac = false // 去除第三个li的高亮
        this.twoshow = true // 控制第二个nav显示
        this.City = '' // 第二nav置空
        this.threeshow = false // 第三nav隐藏
        this.oneliIndex = index
        this._newArr(this.showCityList, -1) // 清除市级高亮
        this.showDeter = false
      }
      // 点击选择当前
      this.provinceList.map(a => {
        a.selected = false
      })
      this.provinceList[index].selected = true
    },
    cityActive(iscity) {
      if (iscity == 3) {
        this.city = this.extra.cityCode.split(',')[0]
        this.City = this.extra.cityCode.split(',')[1]
        var cityActiveCode = this.extra.cityCode.split(',')[0]
        if (this.version == 32) {
          this.city = this.extra.cityCode.split('-')[0]
          this.City = this.extra.cityCode.split('-')[1]
          cityActiveCode = this.extra.cityCode.split('-')[0]
        }
        this._newArr(this.showCityList, cityActiveCode)
        this.$nextTick(() => { // 让li标签回到顶部
          this._gotoTop('.citJuli', 1)
        })
      }
    },
    areaActive(iscity, type) {
      if (iscity == 3) {
        this.showCity = false
        this.showDistrict = true
        this.twoac = false // 给第二个nav添加高亮
        this.threeac = true // 去除第三个li的高亮
        this.threeshow = true // 第三nav隐藏
        this.district = this.extra.areaId.split(',')[0]
        this.District = this.extra.areaId.split(',')[1]
        var areaActiveCode = this.extra.areaId.split(',')[0]
        this._newArr(this.showDistrictList, areaActiveCode)
        this.$nextTick(() => { // 让li标签回到顶部
          this._gotoTop('.disJuli', 2)
        })
      }
    },
    // 城市处理数据
    citytion(version, code, province, iscity, card, version1, channelTag) {
      var obj = {}
      obj[2] = () => {
        this.provinceList.forEach(item => {
          if (item.code == code) {
            this.showCityList = item.children
            this.cityActive(iscity)
          }
        })
      }
      obj[4] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.area
              items.code = items.areaCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[5] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.cityCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[8] = obj[4]
      obj[20] = obj[2]
      obj[21] = obj[2]
      obj[25] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.regionName
              items.code = items.regionCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[26] = obj[25]
      obj[30] = obj[2]
      obj[32] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.mcc
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[37] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.area
              items.code = items.id
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[39] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[41] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.id
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[42] = obj[2]
      obj[43] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.cityName
              items.code = items.cityCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[44] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.cityCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[45] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.id
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[46] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.cityCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[47] = () => {
        cityQuery(version, code, card).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.termValue
              items.code = items.termKey
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[50] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.areaName
              items.code = items.id
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[52] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.mcc
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[53] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.code
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[54] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.areaName
              items.code = items.areaCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[55] = () => {
        cityQuery(version, code, '', version1).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.areaName
              items.code = items.areaCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[56] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.cityId
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[58] = obj[2]
      obj[59] = obj[2]
      obj[62] = obj[47]
      obj[65] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.areaName
              items.code = items.areaCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[66] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.id
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[69] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.id
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[70] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.code
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[71] = () => {
        cityQuery(version, province, card).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.id
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[72] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.name
              items.code = items.code
            })
            this.showCityList = res.result
            this.cityActive(iscity)
          }
        })
      }
      obj[73] = obj[71]
      obj[74] = obj[71]
      obj[75] = obj[43]
      obj[76] = obj[71]
      obj[77] = obj[65]
      obj[78] = obj[65]
      obj[79] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.city
              items.code = items.cityCode
            })
            this.showCityList = res.result
            this.cityActive(iscity)
            this.areation(version, '', this.City, province, iscity)

          }
        })
      }
      obj[80] = obj[71]
      obj[81] = obj[71]
      obj[82] = obj[71]
      obj[83] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.cityName;
              items.code = items.cityName;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      obj[84] = () => {
        cityQuery(version, province).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.city;
              items.code = items.areaId;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      obj[85] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.name;
              items.code = items.cityCode;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      obj[86] = obj[45];
      obj[87] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.divisionName;
              items.code = items.id;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      obj[88] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.name;
              items.code = items.cityCode;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      obj[89] = obj[71]
      obj[90] = obj[2]
      obj[91] = obj[71]
      obj[92] = obj[71]
      obj[93] = obj[71]
      obj[94] = () => {
        cityQuery(version, province, card).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.city;
              items.code = items.cityCode;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      obj[95] = obj[87]
      obj[96] = obj[88]
      obj[97] = obj[65]
      obj[98] = obj[87]
      obj[99] = obj[87]
      obj[100] = obj[96]
      obj[101] = obj[71]
      obj[102] = obj[94]
      obj[110] = obj[43]
      obj[51] = obj[110]

      obj[111] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.cityName;
              items.code = items.cityCode;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      obj[140] = () => {
        cityQuery(version, code, channelTag).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.cityName;
              items.code = items.cityCode;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      obj[120] = () => {
        cityQuery(version, code).then(res => {
          if (res.resp_code == "000000") {
            res.result.map(items => {
              items.name = items.cityName;
              items.code = items.cityCode;
            });
            this.showCityList = res.result;
            this.cityActive(iscity);
          }
        });
      };
      return obj[version]()
    },
    provinceSelected() {
      this.showProvince = true
      this.showCity = false
      this.showDistrict = false
      this.oneac = true // 给第一个nav添加高亮
      this.twoac = false // 给第二个nav去除高亮
      this.threeac = false // 给第三个nav去掉高亮
    },
    getCityId(code, input, index, isarea, province, Province) { // 点击第二个li
      this.titleIndex = Number
      this.city = code
      this.City = input
      // 选择当前添加active
      this.showCityList.map(a => {
        a.selected = false
      })
      this.showCityList[index].selected = true
      // 选取市区选项之后关闭弹层
      this.oneac = false // 给第一个nav去掉高亮
      this.showDeter = true
      if (this.version == '79') {
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
        this.twoac = false // 给第二个nav添加高亮
        this.threeac = true // 去除第三个li的高亮
        this.threeshow = true // 第三nav隐藏
        this.areation(this.version, code, input, this.Province, isarea, this.card, String(this.extraList.version))
      }
    },
    areation(version, code, city, province, isarea) {
      var obj = {}
      obj[79] = () => {
        areaQuery(version, province, city).then(res => {
          if (res.resp_code == '000000') {
            res.result.map(items => {
              items.name = items.area
              items.code = items.areaCode
            })
            this.showDistrictList = res.result
            this.areaActive(isarea)
          }
        })
      }
      return obj[version]()
    },
    getDistrictId(code, input, index, iscity) { // 点击第二个li
      this.titleIndex = Number
      this.district = code
      this.District = input
      // 选择当前添加active
      this.showDistrictList.map(a => {
        a.selected = false
      })
      this.showDistrictList[index].selected = true
      // 选取市区选项之后关闭弹层
      this.oneac = false // 给第一个nav去掉高亮
      this.twoac = false // 给第一个nav去掉高亮
      this.showDeter = true
    },
    citySelected() {
      this.titleIndex = 2
      this.showProvince = false
      this.showCity = true
      this.showDistrict = false

      this.oneac = false // 给第一个nav去掉高亮
      this.twoac = true // 给第二个nav添加高亮
      this.threeac = false // 给第三个nav去掉高亮
      if (this.$route.query.data !== undefined) {
        this.$nextTick(() => { // 让li标签回到顶部
          this._gotoTop('.citJuli', 1)
        })
      }
    },
    districtSelected() {
      this.titleIndex = 3
      this.showProvince = false
      this.showCity = false
      this.showDistrict = true

      this.oneac = false // 给第一个nav去掉高亮
      this.twoac = false // 给第二个nav添加高亮
      this.threeac = true // 给第三个nav去掉高亮
      if (this.$route.query.data !== undefined) {
        this.$nextTick(() => { // 让li标签回到顶部
          this._gotoTop('.disJuli', 1)
        })
      }
    },
    firstSelPro() {
      if (this.extraList.extra == null || this.extraList.extra == '') {
        this.islayout = true
        this.istoggHeight = true
      } else {
        this.extra = JSON.parse(this.extraList.extra)
        this.islayout = true
        this.istoggHeight = true
        this.province = this.extra.provinceId.split(',')[0]
        this.Province = this.extra.provinceId.split(',')[1]
        this._newArr(this.provinceList, this.extra.provinceId.split(',')[0])
        this.$nextTick(() => {
          var ssss;
          for (var i = 0; i < this.provinceList.length; i++) {
            if (this.provinceList[i].code == this.province) {
              ssss = i
              break;
            }
          }
          this.getProvinceId(this.province, this.Province, ssss, 3)
          this._gotoTop('.proJuli', 0)
        })
      }
    },
    confirm() {
      if (this.version != 61) {
        if (this.version == '79') {
          if (this.Province == "" || this.City == "" || this.District == "") {
            this.$vux.toast.text('请先选择商户省市区', "bottom");
            return;
          }
        } else {
          if (this.Province == "" || this.City == "") {
            this.$vux.toast.text('请先选择商户城市', "bottom");
            return;
          }
        }
      }
      var city = this.city + ',' + this.City
      if (this.version == 32 || this.version == 52) {
        city = this.city + '-' + this.City
      } else if (this.version == 61) {
        city = this.province + ',' + this.Province
        this.city = this.province
        this.City = this.Province
      }
      var extra = {
        provinceId: this.province + ',' + this.Province,
        cityCode: city,
        merprovince: this.Province,
        mercity: this.City,
        merarea: this.city
      }
      if (this.version == 79) {
        extra = Object.assign({}, extra)
        extra.areaId = this.district + ',' + this.District,
          extra.areaCode = this.District
      }
      if (this.version == 61) {
        this.closeAdd()
        this.$parent.merchantTrueFalseBy = true
        this.$emit("merchant", JSON.stringify(extra), JSON.stringify(this.merchantList));
        return
      }
      queryMerchant(this.version, extra, this.extraList.bankName, this.card, String(this.extraList.version)).then(res => {
        if (res.resp_code == '000000') {
          if (res.result.length > 0) {
            this.closeAdd()
            this.setQueryMerchant(this.version, res.result)
            this.$emit("merchant", JSON.stringify(extra), JSON.stringify(this.merchantList));
            this.$parent.consumeType = true
          } else {
            this.$notify({type: "primary", message: '请选择正确的省市区，或者当前城市不支持'});
          }

        } else if (res.resp_code == '333333') {
          this.closeAdd()
          this.$parent.merchantTrueFalseBy = true
          this.$emit("merchant", JSON.stringify(extra), JSON.stringify(this.merchantList));
        } else if (res.resp_code == '999990') {
          this.closeAdd()
          this.$parent.merchantTrueFalseBy = true
          this.$emit("merchant", JSON.stringify(extra), JSON.stringify(this.merchantList));
        }
      })
    },
    // 商户数据处理
    setQueryMerchant(version, item) {
      var obj = {}
      obj[2] = () => {
        item.map(items => {
          items.value = items.merchant_display_name + '(' + items.id + ')'
        })
        this.merchantList = item
      }
      obj[20] = obj[2]
      obj[21] = obj[2]
      obj[25] = () => {
        if (item.length > 100) {
          for (let i = 0; i < 50; i++) {
            item[i].merchant_display_name = item[i].mccName
            item[i].id = item[i].mccCode
            item[i].value = item[i].mccName + '-' + item[i].mccCode
            this.merchantList.push(item[i])
          }
        } else {
          item.map(items => {
            items.merchant_display_name = items.mccName
            items.id = items.mccCode
            items.value = items.mccName + '-' + items.mccCode
          })
          this.merchantList = item
        }

      }

      obj[26] = obj[25]
      obj[30] = obj[2]
      obj[32] = () => {
        item.map(items => {
          items.merchant_display_name = items.mccName
          items.id = items.mccCode
          items.value = items.mccName + '-' + items.mccCode
        })
        this.merchantList = item
      }
      obj[39] = () => {
        item.map(items => {
          items.merchant_display_name = items.subMerchantName
          items.id = items.subMerchantId
          items.value = items.subMerchantName + '(' + items.subMerchantId + ')'
        })
        this.merchantList = item
      }
      obj[42] = obj[2]
      obj[43] = () => {
        item.map(items => {
          items.merchant_display_name = items.merchantFullName
          items.id = items.smBindId
          items.value = items.merchantFullName + '(' + items.smBindId + ')'
        })
        this.merchantList = item
      }
      obj[44] = () => {
        item.map(items => {
          items.merchant_display_name = items.mccName
          items.id = items.mccCode
          items.value = items.mccName + '(' + items.mccCode + ')'
        })
        this.merchantList = item
      }
      obj[45] = () => {
        item.map(items => {
          items.merchant_display_name = items.name
          items.id = items.code
          items.value = items.name + '(' + items.code + ')'
        })
        this.merchantList = item
      }
      obj[46] = () => {
        item.map(items => {
          items.merchant_display_name = items.mcc
          items.id = items.mccCode
          items.value = '(' + items.mcc + ')'
        })
        this.merchantList = item
      }
      obj[47] = () => {
        item.map(items => {
          items.merchant_display_name = items.termValue
          items.id = items.termKey
          items.value = '(' + items.termValue + ')'
        })
        this.merchantList = item
      }
      obj[52] = () => {
        item.map(items => {
          items.merchant_display_name = items.mccName
          items.id = items.mccCode
          items.value = items.mccName + '-' + items.mccCode
        })
        this.merchantList = item
      }
      obj[54] = () => {
        item.map(items => {
          items.merchant_display_name = items.mccName
          items.id = items.mccCode
          items.value = items.mccName + '(' + items.mccCode + ')'
        })
        this.merchantList = item
      }
      obj[55] = () => {
        item.map(items => {
          items.merchant_display_name = items.mccName
          items.id = items.mccCode
          items.value = items.mccName + '(' + items.mccCode + ')'
        })
        this.merchantList = item
      }
      obj[62] = obj[47]
      obj[65] = () => {
        item.map(items => {
          items.merchant_display_name = items.mccName
          items.id = items.mccCode
          items.value = items.mccName + '(' + items.mccCode + ')'
        })
        this.merchantList = item
      }
      obj[79] = () => {
        item.map(items => {
          items.merchant_display_name = items.merName
          items.id = items.merCode
          items.value = items.merName + '(' + items.merCode + ')'
        })
        this.merchantList = item
      }
      obj[83] = () => {
        item.map(items => {
          items.merchant_display_name = items.mccName;
          items.id = items.mccCode;
          items.value = items.mccName + "(" + items.mccCode + ")";
        });
        this.merchantList = item;
      };
      return obj[version]()
    },
  },
}
</script>
<style>
.ysc-header {
  font-size: 12px;
  text-align: center;
}

.addAddress input {
  height: 20px;
  width: 83%;
  background: #fff;
  color: #262e31;
  font-size: 15px;
  border: none;
  margin: 0 15px;
  padding: 0 15px;
}

/* 地址选择弹层 */
.ac {
  color: #000 !important;
  border-bottom: 1px solid #fff !important;
}

.myAddress {
  width: 100%;
  background-color: white;
  border-top: 4px solid rgba(245, 245, 245, 1);
  color: #333;
}

.myAddress .cont {
  border-bottom: 1px solid rgba(245, 245, 245, 0.8);
}

.myAddress .cont span {
  display: inline-block;
  font-size: 12px;
  color: #333;
  line-height: 42px;
  margin-left: 15px;
}

.myAddress .cont section {
  float: left;
}

.myAddress .cont p {
  display: inline-block;
  font-size: 12px;
  color: #333333;
  line-height: 42px;
  margin-left: 50px;
}

.myAddress .cont .pic2 {
  float: right;
  width: 12px;
  height: 22 p x;
  margin: 15px 15px 15px 0;
}

.myAddress .cont p.text {
  margin-left: 0.72rem;
}

.address {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 121;
  background: #fff;
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: height .5s;
}

.toggHeight {
  height: 60%;
}

.layout {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 120;
  opacity: 0;
  transition: all .5s;
  background: rgb(53, 58, 60);
  visibility: hidden;
}

.layoutBg {
  opacity: .7;
  visibility: visible;
}

.area_box {

}

.area {
  float: left;
  display: inline-block;
  font-size: 12px;
  height: 22px;
  line-height: 22px;
  margin-left: 10px;
  color: #262e31;
  margin-top: 17px;
  max-width: calc(100% - 80%);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.addList {
  margin-left: 10px;
  font-size: 15px;
  line-height: 33px;
  color: #262e31;
}

/* 修改的格式 */
.address ul {
  height: calc(100% - 80px);
  overflow: auto;
}

.address ul li {
  list-style: none;
}

.address .city_title .accolor {
  color: #d2a24e;
  border-bottom: 1px solid #d2a24e;
}

.address ul .active {
  color: #d2a24e;
}

.address ul .active span::after {
  content: '';
  /* background-image: url('../../assets/gou_img.png'); */
  width: 30px;
  height: 10px;
  background-repeat: no-repeat;
  background-size: 10px 26px;
  background-position: left 15px center;
  display: inline-block;
}

.city_title {
  height: 40px;
  border-bottom: 1px solid #8a96a3;
}

.determine {
  display: inline-block;
  width: 71px;
  text-align: center;
  float: right;
  height: 40px;
  line-height: 40px;
  margin-right: 15px;
  color: #d2a24e;
  font-size: 12px;
}
</style>
