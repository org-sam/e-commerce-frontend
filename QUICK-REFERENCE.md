# GitOps Quick Reference

## 🚀 Deploy Rápido

### Deploy em Dev (Automático)
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
# ✅ CI automaticamente deploya em dev
```

### Deploy em Staging (Via Tag)
```bash
git tag v1.2.0
git push origin v1.2.0
# ✅ CI cria PR para staging
# 👉 Revisar e fazer merge do PR
```

### Deploy em Produção (Manual)
```bash
# 1. GitHub Actions → Promote to Production
# 2. Input: v1.2.0
# 3. Revisar PR criado
# 4. Merge após aprovação
```

## 🔍 Verificar Status

```bash
# Ver versão em cada ambiente
grep "tag:" infra-gitops/apps/ecommerce-frontend/values/*.yaml

# Status no ArgoCD
kubectl get applications -n argocd | grep ecommerce-frontend

# Logs da aplicação
kubectl logs -n ecommerce-frontend -l app=ecommerce-frontend --tail=100
```

## 🔄 Rollback

```bash
# Dev/Staging - Reverter commit
cd infra-gitops
git revert HEAD
git push

# Prod - Criar PR com versão anterior
# Editar prod.yaml manualmente ou usar workflow
```

## 📋 Checklist de Release

- [ ] Testes passando em dev
- [ ] Tag criada (vX.Y.Z)
- [ ] PR para staging revisado
- [ ] Staging validado
- [ ] Release notes documentadas
- [ ] Workflow manual executado
- [ ] PR para prod aprovado
- [ ] Monitoramento ativo

## 🆘 Troubleshooting

```bash
# ArgoCD não sincroniza
kubectl get application ecommerce-frontend-dev -n argocd -o yaml

# Pod não inicia
kubectl describe pod -n ecommerce-frontend -l app=ecommerce-frontend

# Verificar imagem
docker manifest inspect saiwmon/ecommerce-frontend:v1.2.0
```
