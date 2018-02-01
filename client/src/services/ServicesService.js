import Api from '@/services/Api'

export default {
  transferTakon (_takons, _releasedId) {
    const formData = `released_id=${_releasedId}&takons=${JSON.stringify(_takons)}`
    return Api().post('transfertakonstomany', formData)
  },
  minusTakons (_id, _takons, orgTakonId) {
    const formData = `id=${_id}&amount=${_takons}&org_takon_id=${orgTakonId}`
    return Api().post('minustakons', formData)
  },
  getOwnReleased () {
    return Api().post('getownreleased')
  },
  canselCreation (_id) {
    const formData = `id=${_id}`
    return Api().post('canselcreation', formData)
  },
  aproveCreation (_id) {
    const formData = `id=${_id}`
    return Api().post('aprovecreation', formData)
  },
  getAdminServices () {
    return Api().post('getadminservices')
  },
  addService (_credentials, _id) {
    const formData = `service=${JSON.stringify(_credentials)}&organization_id=${_id}`
    return Api().post('addservice', formData)
  },
  getServices (_id) {
    const formData = `organization_id=${_id}`
    return Api().post('getservices', formData)
  },
  getService (_id) {
    const formData = `id=${_id}`
    return Api().post('getservice', formData)
  },
  editService (_credentials) {
    const formData = `service=${JSON.stringify(_credentials)}`
    return Api().post('editservice', formData)
  },
  archiveService (_id) {
    const formData = `id=${_id}`
    return Api().post('archiveservice', formData)
  },
  getServsForCoupons (_id) {
    const formData = `organization_id=${_id}`
    return Api().post('getservsforcoupons', formData)
  },
  getNotifications () {
    return Api().post('getnotifications')
  },
  getReleased (_id) {
    const formData = `released_id=${_id}`
    return Api().post('getreleased', formData)
  },
  getNotification (_id) {
    const formData = `notification_id=${_id}`
    return Api().post('getnotification', formData)
  },
  approveNotification (_notification) {
    const formData = `notification=${JSON.stringify(_notification)}`
    return Api().post('approvenotification', formData)
  },
  cancelNotification (_id) {
    const formData = `id=${_id}`
    return Api().post('cancelnotification', formData)
  },
  getApproved (_id) {
    const formData = `organization_id=${_id}`
    return Api().post('getapproved', formData)
  },
  donutService (_credentials, _organization, _oldService) {
    const formData = `released=${JSON.stringify(_credentials)}&organization_id=${_organization}&old_service=${_oldService}`
    return Api().post('donutservice', formData)
  }
}
