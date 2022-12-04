<template>
  <div>
    <div>Đây là trang log lịch sử</div>
    <div class="card my-4">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div
          class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
        >
          <h6 class="text-white text-capitalize ps-3">Lịch sử thiết bị</h6>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Thiết bị
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Nội dung
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, index) in listLog" :key="index">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ log.device }}</h6>
                    </div>
                  </div>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge badge-sm bg-gradient-success">{{
                    log.content
                  }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{
                    dateTimeToString(log.createdAt)
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logApi from "@/api/log";
export default {
  data() {
    return {
      listLog: [],
    };
  },
  async created() {
    this.listLog = await logApi.getLogByUserId();
    console.log(this.listLog);
  },
  methods: {
    dateTimeToString(dateTime) {
      var m = new Date(dateTime);
      var dateString =
        m.getFullYear() +
        "/" +
        ("0" + (m.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + m.getDate()).slice(-2) +
        " " +
        ("0" + m.getHours()).slice(-2) +
        ":" +
        ("0" + m.getMinutes()).slice(-2) +
        ":" +
        ("0" + m.getSeconds()).slice(-2);
        return dateString;
    },
  },
};
</script>

<style></style>
