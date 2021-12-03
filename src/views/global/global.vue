<script>
import { getIp } from "@/utils/request";

let ip = getIp()
let index1 = ip.indexOf('//') + 2
ip = ip.substring(index1, ip.indexOf('/', index1))
var brandId = 100, brandName = "卡时间"

export default {
  ip,
  brandId,
  brandName
}
</script>
