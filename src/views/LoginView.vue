<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import usePB from '../composables/usePB'
import AuthLayout from '@/components/AuthLayout.vue'
import { useRouter } from 'vue-router'

interface RuleForm {
  identity: string
  password: string
}

const router = useRouter()
const pb = usePB()
const loading = ref(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  identity: '',
  password: ''
})
const rules = reactive<FormRules<RuleForm>>({
  identity: [{ required: true, message: 'Обязательное поле', trigger: 'blur' }],
  password: [
    { required: true, message: 'Обязательное поле', trigger: 'blur' },
    { min: 6, message: 'Не менее 6 символов', trigger: 'blur' }
  ]
})
const onSubmit = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        await pb
          .collection('users')
          .authWithPassword(ruleForm.identity, ruleForm.password)
          .then(() => {
            console.log('ok!')
            router.push('/')
          })
      } catch (e) {
        console.log('error')
      } finally {
        loading.value = false
      }
    } else {
      loading.value = false
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <AuthLayout>
    <ElCard class="box-card">
      <ElForm :model="ruleForm" ref="ruleFormRef" :rules="rules" size="default">
        <ElFormItem prop="identity">
          <ElInput
            v-model="ruleForm.identity"
            name="identity"
            type="text"
            placeholder="Идентификатор"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="ruleForm.password"
            name="password"
            type="password"
            placeholder="Пароль"
            show-password
          />
        </ElFormItem>
        <ElButton type="primary" @click="onSubmit(ruleFormRef)" :loading="loading">Войти</ElButton>
      </ElForm>
    </ElCard>
  </AuthLayout>
</template>
