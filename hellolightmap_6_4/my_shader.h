#ifndef MY_SHADER_H
#define MY_SHADER_H

#include <glad\glad.h>
#include <GLFW\glfw3.h>

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

#include <iostream>
#include <string>
#include <fstream>
#include <sstream>

using namespace std;

void initVertexShader(GLuint*, const char * &);
void initFragmentShader(GLuint*, const char * &);
void initShaderProgram(GLuint*, GLuint, GLuint);

class MyShader
{
public:
	MyShader(const char*, const char*);
	//MyShader(const MyShader &);
	void use();

	// uniform utils
	void setInt(const string&, int) const;
	void setBool(const string&, bool) const;
	void setFloat(const string&, float) const;
	void setMaxtrix(const string&, float*, int count = 1, bool need_transpose = GL_FALSE) const;
	void setVec3(const std::string &, const glm::vec3 &value) const;
	void setVec3(const std::string &, float x, float y, float z) const;

	GLuint getShaderProgramID()
	{
		return this->shaderProgramID;
	}

	void setShaderProgramID(GLuint val)
	{
		this->shaderProgramID = val;
	}

private:
	GLuint shaderProgramID;
};

#endif // !MY_SHADER_H
