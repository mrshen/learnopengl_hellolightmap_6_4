#version 330 core

in vec3 normal;
in vec3 fragPos;
in vec2 texCoord;

struct Material
{
	sampler2D diffuse;
	sampler2D specular;

	float ambientCoe;
	float shinness;
};
uniform Material objMaterial;

struct SpotLight
{
	vec3 color;
	vec3 position;
	vec3 direction;

	float innerCutOff;
	float outerCutOff;

	float constant;
	float linear;
	float quadratic;
};
uniform SpotLight spotLight;


out vec4 FragColor;
void main()
{
	vec3 norm = normalize(normal);
	vec3 frag2Light = spotLight.position - fragPos;
	float distance = length(frag2Light);
	float attenduation = 1.0 / (spotLight.constant + spotLight.linear * distance + spotLight.quadratic * distance * distance);

	// diffuse color
	vec3 texDiffuse = texture(objMaterial.diffuse, texCoord).rgb;
	vec3 frag2Light_norm = normalize(frag2Light);
	vec3 diffuse = max(dot(frag2Light_norm, norm), 0.0) * texDiffuse * spotLight.color;

	float theta = dot(frag2Light_norm, normalize(-spotLight.direction));
	float epsilon = spotLight.innerCutOff - spotLight.outerCutOff;
	float intensity = clamp((theta - spotLight.outerCutOff) / epsilon, 0.3, 1.0);

	// ambient color
	vec3 ambient = texDiffuse * vec3(objMaterial.ambientCoe) * spotLight.color * vec3(0.9);

	// specular color
	vec3 reflectDir = reflect(-frag2Light_norm, norm);
	vec3 viewDir = normalize(spotLight.position - fragPos);
	float specCoe = max(dot(reflectDir, viewDir), 0.0);
	vec3 specular = pow(specCoe, objMaterial.shinness) * texture(objMaterial.specular, texCoord).rgb * spotLight.color;

	FragColor = vec4((ambient + diffuse + specular) * attenduation * intensity, 1.0);

}