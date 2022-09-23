import { shallowMount ,mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/views/testView/LoginTest.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

describe('Login.vue', () => {
  

  test('登入btn要存在',()=>{
    const wrapper = mount(Login);
    expect(wrapper.get('[id="login_btn"]').exists()).toBe(true)
  })

  test('若無帳號 不能登入',async()=>{
    const wrapper = mount(Login);

    const input = wrapper.get('[id="account"]')
    await input.setValue('')

    await wrapper.get('[id="login_btn"]').trigger('click')

    expect(wrapper.get('[id="account_err"]').isVisible()).toBe(true)


  })
  
})

// ---底下為事件觸發---
// const countComponent = {
//   template: `
//     <div>
//       <button data-test="button" @click="increment">Increment</button>
//       <p data-test="count">{{count}}</p>
//     </div>
//   `,
//   setup () {
//     const count = ref(0)
//     const increment = () => {
//       count.value += 1
//     }

//     return {
//       count,
//       increment
//     }
//   }
// }

// test('count',()=>{
//   const wrapper = mount(countComponent);
//   expect(wrapper.get('[data-test="button"]').exists()).toBe(true)
  

// })


