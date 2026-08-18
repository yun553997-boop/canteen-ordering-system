cat > Dockerfile << 'EOF'
# 使用华为云公开镜像加速节点强行拉取 JDK 17
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/eclipse-temurin:17-jre-jammy
# 将打包的 jar 包复制到容器内部并重命名为 app.jar
COPY *.jar app.jar
# 暴露后端的 8000 端口
EXPOSE 8000
# 容器启动时执行的命令
ENTRYPOINT ["java", "-jar", "/app.jar"]
EOF
