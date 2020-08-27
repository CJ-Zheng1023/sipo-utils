import utils from '../../index'
describe(`聚焦方法测试`, () => {
  test(`纯文本测试`, () => {
    const targetStr = `The present invention helps eliminate any phobia's or fears associated with using the phone. A common fear of using public phones for example is that it is used by a number of people everyday. Because the phone requires the user to place the handset to the users ear and mouth, bacteria and germs can easily be transmitted to the handset and eventually to the next user. To prevent this from occurring, a sponge soaked in disinfectant is placed on the holder of the phone handset. After every use, the disinfectant sterilizes the phone handset killing common germs and bacteria that can originate from the user. This ensures that the phone handset is safe for use for the next user.`
    const focusers = [{
      word: 'to'
    }]
    const tobe = `... A common fear of using public phones for example is that it is used by a number of people everyday. Because the phone requires the user to place the handset to the users ear and mouth, bacteria and germs can easily be transmitted to the handset and eventually to the next user. To prevent this from occurring, a sponge soaked in disinfectant is placed on the holder of the phone handset.`
    expect(utils.focus(targetStr, focusers)).toBe(tobe)
  })
})